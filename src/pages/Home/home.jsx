import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import apiService from "../../components/apiService";

function Home() {
  const [data, setData] = useState({});
  const [currTemperature, setCurrTemperature] = useState(0); // Use state for temperature
  const [currHumid, setCurrHumid] = useState(0); // Use state for humidity
  const [currLight, setCurrLight] = useState(0); // Use state for light

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 1000, // Tự động kết nối lại
      onConnect: () => {
        console.log("STOMP connected");
        client.subscribe("/topic/temperature", (message) => {
          const receivedData = JSON.parse(message.body);
          console.log("Received temp: ", receivedData);
          setCurrTemperature(receivedData);
        });
        client.subscribe("/topic/humid", (message) => {
          const receivedData = JSON.parse(message.body);
          console.log("Received humid: ", receivedData);
          setCurrHumid(receivedData);
        });
        client.subscribe("/topic/light", (message) => {
          const receivedData = JSON.parse(message.body);
          console.log("Received light: ", receivedData);
          setCurrLight(receivedData);
        });
      },
      onDisconnect: () => console.log("STOMP disconnected"),
      onStompError: (error) => console.error("STOMP Error: ", error)
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  const [lightOn, setLightOn] = useState(false);

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    setLightOn(isChecked);
    console.log("Checkbox state:", isChecked);

    try {
      if (isChecked) {
        const data = await apiService.lightOn();
        console.log("API response (Bật đèn):", data);
      } else {
        const data = await apiService.lightOff();
        console.log("API response (Tắt đèn):", data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="bg-pink-50 font-sans">
      <div className="container mx-auto mt-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3">
            <h5 className="text-blue-500 font-bold mb-5">
              Xem thông số các phòng
            </h5>
            <div className="flex flex-wrap">
              <a
                href=""
                className="bg-blue-100 rounded-lg shadow-md text-center p-5 m-2 w-36"
              >
                <i className="fas fa-couch text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Phòng khách</div>
              </a>
              <a
                href=""
                className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36"
              >
                <i className="fas fa-kitchen-set text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Phòng bếp</div>
              </a>
              <a
                href=""
                className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36"
              >
                <i className="fas fa-bed text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Phòng ngủ</div>
              </a>
              <a
                href=""
                className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36"
              >
                <i className="fas fa-bath text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Phòng tắm</div>
              </a>
            </div>
            <h5 className="text-blue-500 font-bold mb-5">
              Điều khiển các thiết bị
            </h5>
            <div className="flex flex-wrap">
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-lightbulb text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển đèn</div>
                <label className="switch">
                  {/* <input type="checkbox" /> */}
                  <input type="checkbox" checked={lightOn} onChange={handleCheckboxChange} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-traffic-light text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển LED RGB</div>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-fan text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển quạt</div>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-door-closed text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Đang mở cửa</div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex justify-around mb-5">
              <div className="text-center">
                <i className="fas fa-thermometer-half text-3xl text-gray-700"></i>
                <span className="block mt-1 text-sm">{currTemperature}°C</span>
              </div>
              <div className="text-center">
                <i className="fas fa-tint text-3xl text-gray-700"></i>
                <span className="block mt-1 text-sm">{currHumid}%</span>
              </div>
              <div className="text-center">
                <i className="fas fa-sun text-3xl text-gray-700"></i>
                <span className="block mt-1 text-sm">{currLight} lux</span>
              </div>
            </div>
            <button className="bg-gray-800 text-white rounded-full py-2 px-4 mb-3 w-full">
              Tổng quan và báo cáo
            </button>
            <button className="bg-gray-800 text-white rounded-full py-2 px-4 w-full">
              Kịch bản điều khiển
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
