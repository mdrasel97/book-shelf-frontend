import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/Router.jsx";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthProvider from "./context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
