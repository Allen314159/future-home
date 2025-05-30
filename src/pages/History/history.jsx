import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import apiService from "../../components/apiService";


function History() {
    const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await apiService.getDeviceLog(date);
        setLogs(data);
      } catch (error) {
        console.error("Lỗi khi tải log:", error);
      }
    }

    fetchLogs();
  }, [date]);


    const deviceLabel = {
        'fan-speed': "Quạt",
        bulb: "Đèn",
        door: "Cửa",
        'rgb-color': "Đèn RGB",
    };

    const valueLabel = {
        on: "Mở",
        off: "Tắt",
        1: "Mở",
        0: "Đóng",
        '#ff0000': "Đỏ",
        '#00ff00': "Xanh lá",
        '#0000ff': "Xanh dương",
        '#ffff00': "Vàng",
    };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label htmlFor="date" className="font-semibold text-gray-700">
              Thống kê ngày:
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-blue-300 rounded-lg px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Nhật ký hoạt động</h2>
        <a
            href="/home"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
            Quay lại
        </a>
        </div>

      <ul className="space-y-3">
        {logs.map((log, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <div><strong>Thiết bị:</strong> {deviceLabel[log.deviceType]}</div>
            <div><strong>Thời gian:</strong> {new Date(log.time).toLocaleString("vi-VN")}</div>
            <div>
                <strong>Trạng thái:</strong>{" "}
                {valueLabel.hasOwnProperty(log.value) ? valueLabel[log.value] : `Tốc độ ${log.value}%`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;