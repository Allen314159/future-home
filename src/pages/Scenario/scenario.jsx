import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import apiService from "../../components/apiService";


function Scenario() {
  const [dataList, setDataList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ gio: 0, phut: 0, thietBi: "fan", trangThai: "On" });
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa kịch bản này?")) {
        try {
            await apiService.deleteScenario(id);
            // setDataList(dataList.filter(item => item.id !== id));
            //reload the page
            window.location.reload();
        } catch (err) {
            alert("Xóa kịch bản thất bại. Vui lòng thử lại sau.");
        }
        }
    }

    const thietBiLabel = {
        fan: "Quạt",
        bulb: "Đèn",
        door: "Cửa",
    };

    const trangThaiLabel = {
        on: "Mở",
        off: "Đóng",
    };
    const handleAdd = async () => {
        const newItem = {
            name: `${thietBiLabel[formData.thietBi]}-${trangThaiLabel[formData.trangThai]}`,
            device: formData.thietBi,
            status: formData.trangThai,
            hour: parseInt(formData.gio),
            minute: parseInt(formData.phut),
        };
        await apiService.addScenario(newItem);
        setDataList((prev) => [...prev, newItem]);
        setShowModal(false);
        setFormData({ gio: 0, phut: 0, thietBi: "fan", trangThai: "On" });
        //reload the page
        window.location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.getScenario();
                setDataList(data);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Kịch bản điều khiển
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
            onClick={() => setShowModal(true)}
          >
            Thêm kịch bản
          </button>

        </div>
        {dataList.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có kịch bản nào.</p>
        ) : (
          <ul className="space-y-4">
            {dataList.map((item) => (
              <li
                key={item.id}
                className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-800 font-medium">Kịch bản {item.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleDetails(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      {expandedId === item.id ? "Ẩn chi tiết" : "Xem chi tiết"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                {expandedId === item.id && (
                  <div className="mt-3 text-gray-700 text-sm bg-white border border-blue-100 rounded p-3">
                    <div className="mt-2">
                      <strong>Thiết bị:</strong> {thietBiLabel[item.device]}<br />
                      <strong>Trạng thái:</strong> {trangThaiLabel[item.status]}<br />
                      <strong>Thời gian</strong> {item.hour} giờ {item.minute} phút<br />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-blue-700">Thêm kịch bản mới</h3>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-sm font-medium">Giờ</label>
                    <input
                    type="number"
                    min={0}
                    max={23}
                    value={formData.gio}
                    onChange={(e) => setFormData({ ...formData, gio: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Phút</label>
                    <input
                    type="number"
                    min={0}
                    max={59}
                    value={formData.phut}
                    onChange={(e) => setFormData({ ...formData, phut: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 text-sm font-medium">Thiết bị</label>
                    <select
                    value={formData.thietBi}
                    onChange={(e) => setFormData({ ...formData, thietBi: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    >
                    <option value="fan">Quạt</option>
                    <option value="bulb">Đèn</option>
                    <option value="door">Cửa</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 text-sm font-medium">Trạng thái</label>
                    <select
                    value={formData.trangThai}
                    onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    >
                    <option value="On">Mở</option>
                    <option value="Off">Đóng</option>
                    </select>
                </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Hủy
                </button>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Lưu
                </button>
                </div>
            </div>
            </div>
            
        )}
        <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-lg py-3 px-6 w-full mt-2 shadow transition"
              onClick={() => window.history.back()}
            >
              Kết thúc
        </button>
        
      </div>
    </div>
  );
}

export default Scenario;