import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import apiService from "../../components/apiService";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  const [currTemperature, setCurrTemperature] = useState(0); // Use state for temperature
  const [currHumid, setCurrHumid] = useState(0); // Use state for humidity
  const [currLight, setCurrLight] = useState(0); // Use state for light
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Kiểm tra hợp lệ và gửi dữ liệu lên backend
    await apiService.changePassword(formData);
    console.log('Form:', formData);
    alert("Đổi mật khẩu thành công!");
    setIsOpen(false); // Đóng modal sau khi submit
  };

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

  const [doorOpen, setDoorOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingDoorState, setPendingDoorState] = useState(false); // trạng thái chờ xử lý
  const [password, setPassword] = useState("");

  // const handleCheckboxDoorChange = async (e) => {
  //   const isChecked = e.target.checked;
  //   setDoorOpen(isChecked);
  //   console.log("Checkbox state:", isChecked);

  //   try {
  //     if (isChecked) {
  //       const data = await apiService.doorOpen();
  //       console.log("API response (Mở cửa):", data);
  //     } else {
  //       const data = await apiService.doorClose();
  //       console.log("API response (Đóng cửa):", data);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };

  const handleCheckboxDoorChange = (e) => {
    const isChecked = e.target.checked;
    setPendingDoorState(isChecked);      // Lưu trạng thái mới người dùng chọn
    setShowPasswordModal(true);          // Hiện hộp thoại nhập mật khẩu
  };

  const handlePasswordSubmit = async () => {
    try {
      const data = pendingDoorState
        ? await apiService.doorOpen(password)
        : await apiService.doorClose(password);

      console.log("API response:", data);
      setDoorOpen(pendingDoorState); // Đổi trạng thái thật sự sau khi xác thực thành công
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Mật khẩu sai hoặc lỗi hệ thống.");
    } finally {
      setShowPasswordModal(false);
      setPassword("");
    }
  };

  const [speed, setSpeed] = useState(0); // State for fan speed
  const handleFanSpeedChange = async (event) => {
    setSpeed(event.target.value);
    const speedValue = event.target.value;
    setSpeed(speedValue);
    console.log("Tốc độ quạt:", speedValue);
    try{
      const data = await apiService.fanspeed(speedValue);
      console.log("API response (Tốc độ quạt):", data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const [colorRGB, setColorRGB] = useState(0); // State for fan speed
  const handleColorRGBChange = async (event) => {
    const colorValue = event.target.value;
    setColorRGB(colorValue);
    console.log("Màu:", colorValue);
    try{
      const data = await apiService.changeColor(colorValue);
      console.log("API response (Màu):", data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-100 min-h-screen font-sans">
      <div className="container mx-auto py-8 px-2">
        {/* Tổng quan hệ thống */}
        <div className="mb-8">
          <div className="bg-white/80 rounded-3xl shadow-xl border border-blue-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <i className="fas fa-home text-4xl text-blue-500"></i>
              <div>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-1">Future Home Dashboard</h2>
                <p className="text-gray-500 font-medium">Giám sát & điều khiển ngôi nhà thông minh của bạn</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <i className="fas fa-thermometer-half text-2xl text-blue-500"></i>
                <div className="font-bold text-lg">{currTemperature}°C</div>
                <div className="text-xs text-gray-500">Nhiệt độ</div>
              </div>
              <div className="text-center">
                <i className="fas fa-tint text-2xl text-blue-400"></i>
                <div className="font-bold text-lg">{currHumid}%</div>
                <div className="text-xs text-gray-500">Độ ẩm</div>
              </div>
              <div className="text-center">
                <i className="fas fa-sun text-2xl text-yellow-400"></i>
                <div className="font-bold text-lg">{currLight} lux</div>
                <div className="text-xs text-gray-500">Ánh sáng</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cột trái */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            {/* Khối Xem thông số các phòng */}
            <div className="bg-white/90 rounded-2xl shadow-lg border border-blue-100 p-6">
              <h5 className="text-blue-600 font-bold mb-5 text-xl flex items-center gap-2">
                <i className="fas fa-layer-group"></i>
                Xem thông số các phòng
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-100 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl cursor-pointer border border-blue-200">
                  <i className="fas fa-couch text-3xl mb-2 text-blue-600"></i>
                  <div className="font-bold">Phòng khách</div>
                </div>
                <div className="bg-amber-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl cursor-pointer border border-amber-200">
                  <i className="fas fa-kitchen-set text-3xl mb-2 text-amber-600"></i>
                  <div className="font-bold">Phòng bếp</div>
                </div>
                <div className="bg-purple-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl cursor-pointer border border-purple-200">
                  <i className="fas fa-bed text-3xl mb-2 text-purple-600"></i>
                  <div className="font-bold">Phòng ngủ</div>
                </div>
                <div className="bg-cyan-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl cursor-pointer border border-cyan-200">
                  <i className="fas fa-bath text-3xl mb-2 text-cyan-600"></i>
                  <div className="font-bold">Phòng tắm</div>
                </div>
              </div>
            </div>
            {/* Khối Điều khiển các thiết bị */}
            <div className="bg-white/90 rounded-2xl shadow-lg border border-blue-100 p-6">
              <h5 className="text-blue-600 font-bold mb-5 text-xl flex items-center gap-2">
                <i className="fas fa-sliders-h"></i>
                Điều khiển các thiết bị
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Đèn */}
                <div className="bg-yellow-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl border border-yellow-200">
                  <i className="fas fa-lightbulb text-3xl mb-2 text-yellow-400"></i>
                  <div className="font-bold mb-2">Điều khiển đèn</div>
                  <label className="switch">
                    <input type="checkbox" checked={lightOn} onChange={handleCheckboxChange} />
                    <span className="slider"></span>
                  </label>
                </div>
                {/* LED RGB */}
                <div className="bg-pink-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl border border-pink-200">
                  <i className="fas fa-traffic-light text-3xl mb-2 text-pink-500"></i>
                  <div className="font-bold mb-2">Điều khiển LED RGB</div>
                  <select
                    id="colorSelect"
                    className="appearance-none bg-blue-100 text-black font-bold py-1 px-4 rounded-lg shadow focus:outline-none"
                    value={colorRGB}
                    onChange={handleColorRGBChange}
                  >
                    <option value="ff0000">Đỏ</option>
                    <option value="ffff00">Vàng</option>
                    <option value="0000ff">Xanh</option>
                  </select>
                </div>
                {/* Quạt */}
                <div className="bg-blue-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl border border-blue-200">
                  <i className="fas fa-fan text-3xl mb-2 text-blue-400"></i>
                  <div className="font-bold mb-2">Điều khiển quạt</div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    className="w-full mt-2 accent-blue-500"
                    value={speed}
                    onChange={handleFanSpeedChange}
                  />
                  <p className="mt-1 text-sm">Tốc độ: <span className="font-semibold">{speed}</span>%</p>
                </div>
                {/* Cửa */}
                {/* <div className="bg-gray-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl border border-gray-200">
                  <i className="fas fa-door-closed text-3xl mb-2 text-gray-700"></i>
                  <div className="font-bold mb-2">Đang mở cửa</div>
                  <label className="switch">
                    <input type="checkbox" checked={doorOpen} onChange={handleCheckboxDoorChange} />
                    <span className="slider"></span>
                  </label>
                </div> */}
                {/* {Cửa mới} */}
                <div className="bg-gray-50 rounded-xl shadow text-center p-5 transition hover:scale-105 hover:shadow-xl border border-gray-200">
                  <i className="fas fa-door-closed text-3xl mb-2 text-gray-700"></i>
                  <div className="font-bold mb-2">
                    {doorOpen ? "Đang mở cửa" : "Đang đóng cửa"}
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={doorOpen}
                      onChange={handleCheckboxDoorChange}
                    />
                    <span className="slider"></span>
                  </label>

                  {showPasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Nhập mật khẩu</h2>
                        <input
                          type="password"
                          className="w-full border border-gray-300 p-2 rounded mb-4"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={() => {
                              setShowPasswordModal(false);
                              setPassword("");
                            }}
                          >
                            Hủy
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={handlePasswordSubmit}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Cột phải */}
          {/* <div className="w-full md:w-1/3 flex flex-col gap-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition"
              onClick={() => navigate("/report")}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              Tổng quan và báo cáo
            </button>
            {/* <button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition">
              <i className="fas fa-cogs mr-2"></i>
              Kịch bản điều khiển
            </button> */}
          {/* </div> */}
          <div className="w-1/2 flex flex-col gap-6">
            <button className="bg-blue-800 hover:bg-gray-900 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition">
              <i className="fas fa-cogs mr-2"></i>
              Thông tin cá nhân
            </button> 

            <button 
              className="bg-red-800 hover:bg-gray-900 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition"
              onClick={() => navigate("/history")}
            >
              <i className="fas fa-cogs mr-2"></i>
              Lịch sử hoạt động
            </button> 
            
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition"
              onClick={() => navigate("/report")}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              Tổng quan và báo cáo
            </button>

            
            <button 
              className="bg-gray-800 hover:bg-gray-900 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition"
              onClick={() => navigate("/scenario")}
            >
              <i className="fas fa-cogs mr-2"></i>
              Kịch bản điều khiển
            </button> 

            <button 
              className="bg-green-800 hover:bg-gray-900 text-white rounded-full py-3 px-4 w-full font-semibold shadow transition"
              onClick={() => setIsOpen(true)}
            >
              <i className="fas fa-cogs mr-2"></i>
              Đổi mật khẩu cửa
            </button> 

            

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Đổi mật khẩu cửa</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-medium">Mật khẩu cũ</label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Mật khẩu mới</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded bg-green-700 hover:bg-green-800 text-white font-semibold"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

