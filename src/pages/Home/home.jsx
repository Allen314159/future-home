import React from "react";
import "./home.css";


function Home() {
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
                <div className="flex items-center justify-center">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-traffic-light text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển LED RGB</div>
                <select class="col-start-1 row-start-1 appearance-none bg-blue-100 blue:bg-gray-800 text-black font-bold py-1 px-4 rounded-lg shadow-md focus:outline-none focus:shadow-outline">
                  <option>Đỏ</option>
                  <option>Vàng</option>
                  <option>Xanh</option>
                </select>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-fan text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển quạt</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  class="w-full mt-2"
                ></input>
              </div>
              <div className="bg-white rounded-lg shadow-md text-center p-5 m-2 w-36">
                <i className="fas fa-door-closed text-3xl w-12 h-12 mx-auto mb-2"></i>
                <div className="font-bold">Điều khiển cửa</div>
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
                <span className="block mt-1 text-sm">20°C</span>
              </div>
              <div className="text-center">
                <i className="fas fa-tint text-3xl text-gray-700"></i>
                <span className="block mt-1 text-sm">50%</span>
              </div>
              <div className="text-center">
                <i className="fas fa-sun text-3xl text-gray-700"></i>
                <span className="block mt-1 text-sm">50%</span>
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
