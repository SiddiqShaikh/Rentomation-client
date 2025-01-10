import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRentModal from "../../hooks/rentModal";
import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";
import Select from "../Select";
import { PakistanLocations } from "../../utils/mock";
import { IoIosBed } from "react-icons/io";
import { MdShower } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Checkbox from "../Checkbox";
import apiCall from "../../utils/api";
import { toast } from "react-toastify";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { FaPlus } from "react-icons/fa";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const RentModal = () => {
  const rentModal = useRentModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isEditMode = rentModal.isEditMode;
  const propertyData = rentModal.propertyData;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      rent: 0,
      location: {},
      city: "",
      bed: 1,
      shower: 1,
      parking: "",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnhv7eUUhKkJZci46XPjRS9STP_iYlwIHH75DNnd8jqKI9RkUjOvNlIMhF8GK9kJjsIs&usqp=CAU",
      ],
      payper: "",
    },
  });
  const CheckboxOption = [
    {
      value: "yes",
      label: "Yes",
      name: "yes",
    },
    {
      value: "no",
      label: "No",
      name: "no",
    },
  ];
  useEffect(() => {
    if (isEditMode && propertyData) {
      Object.keys(propertyData).forEach((key) => {
        setValue(key as keyof FieldValues, propertyData[key]);
      });

      if (propertyData?.images?.length > 0) {
        setFileList(
          propertyData?.images?.map((image: string, index: number) => ({
            uid: index,
            name: `image-${index}`,
            status: "done",
            url: image,
          }))
        );
      }

      // Set city and area details for edit mode
      if (propertyData?.location) {
        setSelectedCity(propertyData.city);
        setSelectedArea({
          label: propertyData.location.name,
          lat: propertyData.location.lat,
          lng: propertyData.location.lng,
        });

        setValue("location", {
          name: propertyData.location.name,
          lat: propertyData.location.lat,
          lng: propertyData.location.lng,
        });
      }

      // Set parking details if available
      if (propertyData?.parking) {
        setValue("parking", propertyData.parking);
      }
    } else {
      reset();
      setFileList([]);
    }
  }, [isEditMode, propertyData, reset, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    data.location = {
      name: selectedArea?.label,
      lat: selectedArea?.lat,
      lng: selectedArea?.lng,
    };
    delete data.ownerDetails;
    delete data._id;
    delete data.status;
    delete data.createdAt;
    const token = localStorage.getItem("auth-token");
    const endpoint = isEditMode
      ? `property/${propertyData?._id}`
      : "property/create";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const uploadedImages = [];
      if (fileList?.length > 0) {
        for (const file of fileList) {
          const formData = new FormData();
          formData.append("profile", file.originFileObj as Blob);

          const response = await apiCall(
            "user/upload-picture",
            "POST",
            formData,
            {},
            {
              "x-auth-token": `Bearer ${token}`,
            }
          );

          uploadedImages.push(response.data);
          console.log("Image Response:", response);
        }
      }

      const formatedData = {
        ...data,
        images: uploadedImages?.map((image) => image?.url),
      };

      try {
        const response = await apiCall(
          endpoint,
          method,
          formatedData,
          {},
          {
            "x-auth-token": `Bearer ${token}`,
          }
        );
        toast.success(response?.message);
        rentModal.onClose();
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        console.error("Login error:", error);
      } finally {
        setLoading(false);
        reset();
        setFileList([]);
      }

      // return uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error; // Handle errors as needed
    }
  };

  const Cities = PakistanLocations.map((item, key) => ({
    label: item?.city,
    value: item?.city,
    key,
  }));

  const Areas = PakistanLocations.find((item) => item.city === selectedCity);
  const areasOption = Areas?.areas?.map((item, key) => ({
    label: item?.name,
    value: item?.name,
    key,
    lat: item?.lat,
    lng: item?.lng,
  }));

  const payper = [
    { label: "Per month", value: "mo", key: 0 },
    { label: "per night", value: "night", key: 1 },
  ];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const formatedData = newFileList.map((file) => {
      return {
        ...file,
        status: "done",
      };
    });

    setFileList(formatedData as UploadFile[]);
  };

  const uploadButton = (
    <button
      className="border-none bg-none flex items-center justify-center flex-col"
      type="button"
    >
      <FaPlus />
      <div className="mt-2">Upload Image</div>
    </button>
  );

  const bodyContent = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-center">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          accept=".png, .jpg, .jpeg"
          beforeUpload={(file) => {
            if (
              file.type !== "image/png" &&
              file.type !== "image/jpeg" &&
              file.type !== "image/jpg"
            ) {
              toast.error("You can only upload image file!");

              return false;
            }
          }}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>

      <Input
        placeholder="Property title"
        name="title"
        id="title"
        required
        label="Property title"
        register={register}
        disabled={loading}
        errors={errors}
      />
      <Input
        placeholder="Property Description"
        name="description"
        id="description"
        required
        label="Property Description"
        register={register}
        disabled={loading}
        errors={errors}
      />
      <div className="flex gap-4 flex-wrap items-center">
        <Input
          placeholder="Number of Bed"
          name="bed"
          id="bed"
          required
          label="Number of Bed"
          register={register}
          disabled={loading}
          errors={errors}
          type="number"
          icon={IoIosBed}
          containerClass="flex-1"
        />
        <Input
          placeholder="Number of showers"
          name="shower"
          id="shower"
          required
          label="Number of showers"
          register={register}
          disabled={loading}
          errors={errors}
          type="number"
          icon={MdShower}
          containerClass="flex-1"
        />
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Input
          placeholder="Rent"
          name="rent"
          id="rent"
          required
          label="Rent"
          register={register}
          disabled={loading}
          errors={errors}
          type="number"
          icon={GiTakeMyMoney}
          containerClass="flex-1"
        />
        <Select
          id="payper"
          required
          register={register}
          options={payper}
          placeholder="Select duration"
          errors={errors}
        />
      </div>

      <Select
        id="city"
        required
        register={register}
        options={Cities}
        placeholder="Select City"
        errors={errors}
        onChange={(event) => setSelectedCity(event.value)}
      />
      <Select
        id="location"
        required
        register={register}
        options={areasOption ?? []}
        placeholder="Select Location"
        errors={errors}
        onChange={(area) => {
          console.log("Selected Area:", area);
          setSelectedArea(area);
        }}
      />
      <Checkbox
        id="parking"
        required
        register={register}
        label="Parking"
        options={CheckboxOption}
      />
      {/* <input type="file" multiple onChange={onImageUpload} disabled={loading} />
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Uploaded Image"
            className="w-16 h-16 object-cover"
          />
        ))}
      </div> */}
    </div>
  );
  const footerContent = (
    <div className="mt-4 flex gap-4">
      <Button
        variant="Secondary"
        label="Cancel"
        onClick={() => {
          rentModal.onClose();
          reset();
        }}
        disabled={loading}
      />
      <Button
        variant="Primary"
        label={isEditMode ? "Update" : "Create"}
        onClick={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
  return (
    <Modal
      bodyContent={bodyContent}
      footerContent={footerContent}
      title="List new property"
      subtitle="Rent your property now!"
      onCloseModal={rentModal.onClose}
      openModal={rentModal.isOpen}
    />
  );
};

export default RentModal;
