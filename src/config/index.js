const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "";

export const BACKEND_URL = dev ? "http://localhost:5000/api" : "https://greensage-bcj5.onrender.com/api";

export const SOCKET_URL = dev ? "http://localhost:5000" : "https://greensage-bcj5.onrender.com";
