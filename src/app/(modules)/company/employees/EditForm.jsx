"use client";

import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const EditForm = ({ user, onClose, manager, setManagers }) => {
  const { errors, setErrors, renderFieldError } = useForm();
  const userDefault = "/images&icons/profile.png";

  const [isLoding, setIsLoding] = useState(false);
  const [image_id, setImageId] = useState(user?.image_id || "");
  const [isImageLoading, setImageIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(user?.image_url || userDefault);

  const [form, setForm] = useState({
    name: user?.name || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    postal_code: user?.postal_code || "",
    image_id: user?.image_id || "",
  });

  const handleForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const makeRequest = async (e) => {
    e.preventDefault();
    setErrors(null);
    setIsLoding(true);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
        "token"
      )}`;

      const formData = new FormData(e.target);
      formData.append("_method", "PUT");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}manager/${user.id}`,
        formData
      );

      setIsLoding(false);
      onClose(true);
      setManagers(response.data.data);

      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setIsLoding(false);
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const onImageUpload = async (event) => {
    event.preventDefault();
    setImageIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("token", getCookie("token"));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      setImageSrc(data.image_url);
      setImageId(data.id);
      handleForm("image_id", data.id);
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
            {isImageLoading && <FontAwesomeIcon icon={faSpinner} spin />}
            <img
              src={imageSrc || userDefault}
              alt=""
              className="h-[100px] w-[100px] rounded-full"
            />
          </div>

          <div className="col-span-9">
            <Label label="Have Photos?" />
            <Input type="hidden" name="image_id" value={image_id} />
            <Input type="file" name="image" onChange={onImageUpload} />
            {renderFieldError("image_id")}
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>
        </div>

        {/* FORM FIELDS */}
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
              onChange={(e) => handleForm(field, e.target.value)}
            />
            {renderFieldError(field)}
          </div>
        ))}

        <Submit button="Submit" is_loding={isLoding} disabled={isLoding} />
      </form>
    </div>
  );
};

export default EditForm;
