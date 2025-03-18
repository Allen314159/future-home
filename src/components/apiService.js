// apiService.js

// URL gốc của API (có thể thay đổi theo cấu hình của bạn)
const API_BASE_URL = "http://localhost:8080/adafruit";

// Hàm gọi API để bật/tắt đèn
export const lightOn = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/light/on`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }
    
    // Trả về dữ liệu JSON từ server
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API toggleLight:", error);
    throw error;
  }
};

export const lightOff = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/light/off`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (!response.ok) {
        throw new Error(`Lỗi API với status: ${response.status}`);
      }
      
      // Trả về dữ liệu JSON từ server
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi gọi API toggleLight:", error);
      throw error;
    }
  };

// Bạn có thể thêm các hàm gọi API khác tại đây
// Ví dụ: getStatus, updateColor, v.v.

export default {
  lightOn,
  lightOff,
};
