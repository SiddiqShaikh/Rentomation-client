import { debounce } from "lodash";
import { useCallback } from "react";

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // Replace with your preset
  formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url; // This is the URL of the uploaded image
};

export function useDebouncedSearch(
  setSearch?: any,
  setIsLoading?: any,
  setPage?: (page: number) => void
): any {
  return useCallback(
    debounce((search: string) => {
      if (setSearch) {
        setSearch(search);
      }
      if (setIsLoading) {
        setIsLoading(false);
      }
      if (setPage) {
        setPage(1);
      }
    }, 800),
    [setSearch, setIsLoading]
  );
}
