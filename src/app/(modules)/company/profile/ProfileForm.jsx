"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { useForm } from "@/hooks/useForm";
import { useAuth } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import AddressAutocomplete from "@/app/(auth)/register/AddressAutocomplete";

const ProfileForm = ({ user }) => {
  const { updateprofile, isLoding } = useAuth();
  const { renderFieldError } = useForm();

  const [users, setUser] = useState(user);
  const [image_id, setImageId] = useState(user?.image_id);
  const [imageSrc, setImageSrc] = useState(user?.image_url);
  const [isImageLoading, setImageIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateprofile(formData);
  };

  const onImageUpload = async (event) => {
    event.preventDefault();
    setImageIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("token", getCookie("token"));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();

      setUser({ ...users, image_id: data.file_id, image_url: data.file_path });
      setImageId(data.file_id);
      setImageSrc(data.file_path);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setImageIsLoading(false);
    }
  };

  return (
    <section>
      <div className="container mx-auto max-w-3xl">
        <form onSubmit={makeRequest} className="mx-auto mt-6">
          {/* Image Upload */}
          <div className="grid grid-cols-12 gap-x-4 mb-6">
            <div className="col-span-3">
              {isImageLoading && <FontAwesomeIcon icon={faSpinner} spin />}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="h-24 w-24 rounded-full mx-auto"
                />
              )}
            </div>
            <div className="col-span-9">
              <Label label="Upload Photo" />
              <Input type="hidden" name="image_id" value={image_id} />
              <Input type="file" onChange={onImageUpload} />
              {renderFieldError("image_id")}
              {error && <div className="text-red-600">{error}</div>}
            </div>
          </div>

          {/* Text Inputs */}
          {[
            ["title", "Title"],
            ["website_url", "Website"],
            ["name", "Name"],
            ["short_description", "Short Description"],
            ["description", "Description"],
            ["mobile", "Phone Number"],
          ].map(([field, label]) => (
            <div key={field} className="mb-4">
              <Label label={label} required />
              <Input
                name={field}
                value={users[field] || ""}
                onChange={(e) =>
                  setUser({ ...users, [field]: e.target.value })
                }
              />
              {renderFieldError(field)}
            </div>
          ))}

          {/* Email */}
          <Label label="Email Address" />
          <Input value={users.email} disabled />

          {/* Address */}
          <AddressAutocomplete users={users} />

          <div className="mt-4">
            <Submit button="Submit" is_loding={isLoding} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileForm;
