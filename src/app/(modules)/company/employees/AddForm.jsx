"use client";

import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useState } from "react";
import axios from "axios";
import { useForm } from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const AddForm = ({ onClose, employees, setEmployees }) => {
  const { errors, setErrors, renderFieldError } = useForm();

  const [isLoding, setIsLoding] = useState(false);
  const [image_id, setImageId] = useState("");
  const [isImageLoading, setImageIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [form, setForm] = useState({});

  const handleForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔄 Refresh employee list (unchanged logic)
  const allResult = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}manager`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            token: getCookie("token"),
          },
        }
      );

      if (!response.ok) throw new Error("Fetch failed");

      const dataProp = await response.json();
      const updatedRows = dataProp.data.map((item) => ({
        image_url: item.image_url,
        manager_name: item.name,
        email: item.email,
        mobile: item.mobile,
        manager_type: item.type,
        id: item.id,
      }));

      setEmployees(updatedRows);
    } catch (err) {
      console.error(err);
    }
  };

  // 📤 Submit form
  const makeRequest = async (e) => {
    e.preventDefault();
    setErrors(null);
    setIsLoding(true);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
        "token"
      )}`;

      const formData = new FormData(e.target);
      formData.append("token", getCookie("token"));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}manager`,
        formData
      );

      setIsLoding(false);
      onClose(true);

      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });

      allResult();
    } catch (err) {
      setIsLoding(false);
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  // 🖼 Image upload
  const onImageUpload = async (e) => {
    e.preventDefault();
    setImageIsLoading(true);
    setError(null);
    setImageSrc(null);

    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("token", getCookie("token"));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      setImageSrc(data.file_path);
      setImageId(data.file_id);
      setForm((prev) => ({ ...prev, image_id: data.file_id }));
    } catch (err) {
      setError(err.message);
    } finally {
      setImageIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="mx-auto mt-6" onSubmit={makeRequest}>
        {/* IMAGE */}
        <div className="grid grid-cols-12 gap-x-4 pb-6">
          <div className="col-span-3">
            {isImageLoading && (
              <FontAwesomeIcon icon={faSpinner} spin />
            )}
            {imageSrc && (
              <img
                src={imageSrc}
                alt=""
                className="h-[100px] w-[100px] rounded-full"
              />
            )}
          </div>

          <div className="col-span-9">
            <Label label="Have Photos?" />
            <Input type="hidden" name="image_id" value={image_id} />
            <Input type="file" name="image" onChange={onImageUpload} />
            {renderFieldError("image_id")}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
          </div>
        </div>

        {/* TEXT FIELDS */}
        {[
          ["name", "Name"],
          ["first_name", "First Name"],
          ["last_name", "Last Name"],
          ["email", "Email Address"],
          ["mobile", "Phone Number"],
          ["address", "Address"],
          ["city", "City"],
          ["state", "State"],
          ["country", "Country"],
          ["postal_code", "Zip Code"],
        ].map(([field, label]) => (
          <div key={field} className="pb-6">
            <Label label={label} required="required" />
            <Input
              name={field}
              value={form[field] || ""}
              onChange={(e) =>
                handleForm(field, e.target.value)
              }
            />
            {renderFieldError(field)}
          </div>
        ))}

        {/* SUBMIT */}
        <Submit
          button="Submit"
          is_loding={isLoding}
          disabled={isLoding}
        />
      </form>
    </div>
  );
};

export default AddForm;
