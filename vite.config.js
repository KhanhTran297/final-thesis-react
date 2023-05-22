import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Support js build to jsx
  // Có thể sử dụng component trong file .js
  // Có thể tạo component với đuôi .js
  // Trừ trường hợp không thể sử dụng file JSX thì mới dùng file JS
  // Lý do liên quan đến hiệu suất trang web
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  // Hỗ trợ dấu @ trong đường dẫn + jsconfig.json
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
