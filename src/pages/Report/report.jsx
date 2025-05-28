import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import apiService from "../../components/apiService";

// Đăng ký các thành phần cho ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  const fetchStats = async (selectedDate) => {
    setLoading(true);
    setError("");
    try {
      // const res = await fetch(`/api/report?date=${selectedDate}`);
      // const data = await res.json();
      // Dữ liệu mẫu

      const [bulb, fan, rgb, door] = await Promise.all([
        apiService.getUsage("bulb", selectedDate),
        apiService.getUsage("fan-speed", selectedDate),
        apiService.getUsage("rgb-color", selectedDate),
        apiService.getUsage("door", selectedDate),
      ]);

      const [temperature, humid, light] = await Promise.all([
        apiService.getStatictic("temperature", selectedDate),
        apiService.getStatictic("humid", selectedDate),
        apiService.getStatictic("light", selectedDate),
      ]);

      

      console.log("Số lần sử dụng:", {
        bulb,
        fan,
        rgb,
        door,
      });

      const data = {
        // temperature: [
        //   { time: "06:00:00", value: 25 },
        //   { time: "09:00", value: 28 },
        //   { time: "12:00", value: 30 },
        //   { time: "15:00", value: 32 },
        //   { time: "18:00", value: 29 },
        //   { time: "21:00", value: 26 },
        // ],
        // light: [
        //   { time: "06:00", value: 100 },
        //   { time: "09:00", value: 300 },
        //   { time: "12:00", value: 700 },
        //   { time: "15:00", value: 600 },
        //   { time: "18:00", value: 200 },
        //   { time: "21:00", value: 50 },
        // ],
        // humid: [
        //   { time: "08:00", value: 100 },
        //   { time: "09:00", value: 300 },
        //   { time: "12:00", value: 700 },
        //   { time: "15:00", value: 600 },
        //   { time: "18:00", value: 200 },
        //   { time: "21:00", value: 500 },
        // ],
        temperature: temperature.map(d => ({...d, time: d.time.split(".")[0]})),
        humid: humid.map(d => ({...d, time: d.time.split(".")[0]})),
        light: light.map(d => ({...d, time: d.time.split(".")[0]})),
        deviceUsage: [
          { name: "Đèn", count: bulb },
          { name: "Quạt", count: fan },
          { name: "LED RGB", count: rgb },
          { name: "Cửa", count: door },
        ],
      };
    //   await new Promise((r) => setTimeout(r, 500));
      setStats(data);
    } catch (err) {
      setError("Không thể lấy dữ liệu thống kê. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(date);
  }, [date]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Tổng quan & Báo cáo hệ thống
        </h2>
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
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
            onClick={() => fetchStats(date)}
          >
            Làm mới dữ liệu
          </button>
        </div>
        {loading && (
          <div className="flex justify-center items-center py-8">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></span>
            <span className="text-blue-600 font-semibold">Đang tải dữ liệu...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        {stats && (
          <>
            <div className="mb-10 bg-blue-50 rounded-xl p-5 shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3 text-blue-600 text-center">
                Biểu đồ nhiệt độ trong ngày
              </h3>
              <Line
                data={{
                  labels: stats.temperature.map((d) => d.time),
                  datasets: [
                    {
                      label: "Nhiệt độ (°C)",
                      data: stats.temperature.map((d) => d.value),
                      borderColor: "#2563eb",
                      backgroundColor: "rgba(37,99,235,0.15)",
                      tension: 0.4,
                      pointBackgroundColor: "#2563eb",
                      pointRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#2563eb" },
                    },
                    x: {
                      ticks: { color: "#2563eb" },
                    },
                  },
                }}
              />
            </div>
            <div className="mb-10 bg-yellow-50 rounded-xl p-5 shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3 text-yellow-700 text-center">
                Biểu đồ ánh sáng trong ngày
              </h3>
              <Line
                data={{
                  labels: stats.light.map((d) => d.time),
                  datasets: [
                    {
                      label: "Ánh sáng (lux)",
                      data: stats.light.map((d) => d.value),
                      borderColor: "#f59e42",
                      backgroundColor: "rgba(245,158,66,0.15)",
                      tension: 0.4,
                      pointBackgroundColor: "#f59e42",
                      pointRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#f59e42" },
                    },
                    x: {
                      ticks: { color: "#f59e42" },
                    },
                  },
                }}
              />
            </div>

            <div className="mb-10 bg-green-50 rounded-xl p-5 shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3 text-green-700 text-center">
                Biểu đồ độ ẩm trong ngày
              </h3>
              <Line
                data={{
                  labels: stats.humid.map((d) => d.time),
                  datasets: [
                    {
                      label: "Độ ẩm (%)",
                      data: stats.humid.map((d) => d.value),
                      borderColor: "#34D399",
                      backgroundColor: "rgba(52, 211, 153, 0.15)",
                      tension: 0.4,
                      pointBackgroundColor: "#34D399",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        color: "#10b981" // màu chữ của legend
                      }
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#10b981" }, // màu trục Y
                      grid: { color: "rgba(16, 185, 129, 0.2)" } // màu lưới Y
                    },
                    x: {
                      ticks: { color: "#10b981" }, // màu trục X
                      grid: { color: "rgba(16, 185, 129, 0.2)" } // màu lưới X
                    },
                  },
                }}
              />
            </div>

            <div className="mb-10 bg-green-50 rounded-xl p-5 shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3 text-green-700 text-center">
                Thống kê số lần sử dụng thiết bị
              </h3>
              <Bar
                data={{
                  labels: stats.deviceUsage.map((d) => d.name),
                  datasets: [
                    {
                      label: "Số lần sử dụng",
                      data: stats.deviceUsage.map((d) => d.count),
                      backgroundColor: [
                        "#3b82f6",
                        "#f59e42",
                        "#10b981",
                        "#a78bfa",
                      ],
                      borderRadius: 8,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#10b981" },
                    },
                    x: {
                      ticks: { color: "#10b981" },
                    },
                  },
                }}
              />
            </div>
            <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-lg py-3 px-6 w-full mt-2 shadow transition"
              onClick={() => window.history.back()}
            >
              Kết thúc
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Report;