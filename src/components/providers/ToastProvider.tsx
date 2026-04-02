"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "16px",
          border: "1px solid #e7dfd1",
          padding: "14px 16px",
          background: "#ffffff",
          color: "#1f4d2b",
        },
      }}
    />
  );
}