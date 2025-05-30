// apiService.js

// URL gốc của API (có thể thay đổi theo cấu hình của bạn)
const API_BASE_URL = "http://localhost:8080/adafruit";
const API_BASE_URL_WEB = "http://localhost:8080/web";
const API_BASE_URL_AUTH = "http://localhost:8080/login";


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
    return response;
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
      return response;
    } catch (error) {
      console.error("Lỗi khi gọi API toggleLight:", error);
      throw error;
    }
  };
// /rgb/{value}
// Hàm gọi API để thay đổi màu sắc đèn RGB
export const changeColor = async (color) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rgb/${color}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }
    
    // Trả về dữ liệu JSON từ server
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API changeColor:", error);
    throw error;
  }
};
export const fanspeed = async (speed) => {
  try {
    const response = await fetch(`${API_BASE_URL}/fan/on/${speed}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }
    
    // Trả về dữ liệu JSON từ server
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API changeColor:", error);
    throw error;
  }
};

export const doorClose = async (password) => {
  try {
    console.log("Đang gọi API closeDoor với password:", password);
    const response = await fetch(`${API_BASE_URL}/door/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }
    
    // Trả về dữ liệu JSON từ server
    return await response;
  } catch (error) {
    console.error("Lỗi khi gọi API closeDoor:", error);
    throw error;
  }
};

export const doorOpen = async (password) => {
  try {
    console.log("Đang gọi API closeDoor với password:", password);
    const response = await fetch(`${API_BASE_URL}/door/open`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }
    
    // Trả về dữ liệu JSON từ server
    return await response;
  } catch (error) {
    console.error("Lỗi khi gọi API openDoor:", error);
    throw error;
  }
};

export const getUsage = async (deviceType, time) => {
  try {
    console.log("Đang gọi API /web/usage với:", { deviceType, time });

    const response = await fetch(
      `${API_BASE_URL_WEB}/usage?deviceType=${encodeURIComponent(deviceType)}&time=${encodeURIComponent(time)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }

    // console.log("Kết quả từ API /web/usage:", await response.json());
    const data = await response.json();
    console.log("Kết quả từ API /web/usage:", data);
    return data;

  } catch (error) {
    console.error("Lỗi khi gọi API /web/usage:", error);
    throw error;
  }
};

export const getStatictic = async (sensorType, time) => {
  try {
    console.log("Đang gọi API /web/usage với:", { sensorType, time });

    const response = await fetch(
      `${API_BASE_URL_WEB}/statistic?type=${encodeURIComponent(sensorType)}&time=${encodeURIComponent(time)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }

    // console.log("Kết quả từ API /web/usage:", await response.json());
    const data = await response.json();
    console.log("Kết quả từ API /web/statistic:", data);
    return data;

  } catch (error) {
    console.error("Lỗi khi gọi API /web/statistic:", error);
    throw error;
  }
};

export const changePassword = async (formData) => {
  try {
    console.log("Đang gọi API /login/password với:", { formData });

    const response = await fetch(
      `${API_BASE_URL_AUTH}/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "username": localStorage.getItem("username"),
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`Lỗi API với status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Kết quả từ API /login/password:", data);
    return data;

  } catch (error) {
    console.error("Lỗi khi gọi API /login/password:", error);
    throw error;
  }
};


// Bạn có thể thêm các hàm gọi API khác tại đây
// Ví dụ: getStatus, updateColor, v.v.

export default {
  lightOn,
  lightOff,
  changeColor,
  fanspeed,
  doorClose,
  doorOpen,
  getUsage,
  getStatictic,
  changePassword
};
