"use client";

import { useState } from "react";

interface ImageUploadProps {
  name: string;
  label: string;
  required?: boolean;
  onImageSelect?: (url: string) => void;
}

export default function ImageUpload({ name, label, required, onImageSelect }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Dosyayı base64'e çevir
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImageUrl(base64);
        onImageSelect?.(base64);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
        {label}
      </label>

      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#2f6b3b] file:text-white hover:file:bg-[#1f4d2b]"
        />

        {uploading && (
          <p className="text-sm text-gray-500">Görsel yükleniyor...</p>
        )}

        {imageUrl && (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Önizleme"
              className="w-full max-w-xs h-32 object-cover rounded-xl border"
            />
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>Veya doğrudan URL girin:</p>
          <input
            name={name}
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              onImageSelect?.(e.target.value);
            }}
            required={required}
            className="w-full mt-1 rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </div>
  );
}