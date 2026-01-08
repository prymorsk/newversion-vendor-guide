"use client";

import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import TableCheckbox from "@/components/Front/Company/TableCheckbox";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/Front/UI/Button";
import { useAuth } from "@/context/UserContext";
import Select from "react-select";
import AddressAutocomplete from "./AddressAutocomplete";
import { useSearchParams } from "next/navigation";

export const SignupForm = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
  });

  const searchParam = useSearchParams();
  
  const [userTypes] = useState([
    { value: 0, label: "Vendor" },
    { value: 1, label: "Manager" },
    { value: 2, label: "Company" },
  ]);

  const [userLevels] = useState([
    { value: 1, label: "Elite" },
    { value: 2, label: "Pro" },
    { value: 3, label: "Business" },
  ]);

  const [managerLevels] = useState([
    { value: 0, label: "Regional" },
    { value: 1, label: "Property" },
    { value: 2, label: "Leasing / Assistant Manager" },
    { value: 3, label: "Property Management Company" },
  ]);

  const [isGuest, setIsGuest] = useState(userTypes[0]);
  const [isLevel, setIsLevel] = useState(userLevels[0]);
  const [isManagerLevel, setIsManagerLevel] = useState(managerLevels[0]);

  const [showManager, setShowManager] = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  const { register, isLoding } = useAuth();

  const makeRequest = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    register(formData);
  };

  const userTypeHandle = (selectedOption) => {
    setIsGuest(selectedOption);

    if (selectedOption.value === 0) {
      setShowLevel(true);
      setShowManager(false);
    } else if (selectedOption.value === 1) {
      setShowManager(true);
      setShowLevel(false);
    } else {
      setShowLevel(false);
      setShowManager(false);
    }
  };

  const userLevelHandle = (selectedOption) => {
    setIsLevel(selectedOption);
  };

  const managerLevelHandle = (selectedOption) => {
    setIsManagerLevel(selectedOption);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      action="#"
      method="POST"
      className="mx-auto mt-6"
      id="register_form"
      onSubmit={makeRequest}
    >
      <div className="">
        {/* User Type */}
        <div className="grid grid-cols-2 gap-x-4 pb-2">
          <div className="col-span-2 my-2">
            <Label label="User Type" required="required" />
            <div className="mt-2.5">
              <Select
                id="usertype"
                name="type"
                value={isGuest}
                options={userTypes}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={userTypeHandle}
              />
            </div>
          </div>
        </div>

        {/* User Level */}
        <div
          className="grid grid-cols-2 gap-x-4 pb-2"
          id="userlevel"
          style={{ display: showLevel ? "block" : "none" }}
        >
          <div className="col-span-2 my-2">
            <Label label="User Level" required="required" />
            <div className="mt-2.5">
              <Select
                name="level"
                value={isLevel}
                options={userLevels}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={userLevelHandle}
              />
            </div>
          </div>
        </div>

        {/* Manager Level */}
        <div
          className="grid grid-cols-2 gap-x-4 pb-2 hideusertypelevel"
          id="managerlevel"
          style={{ display: showManager ? "block" : "none" }}
        >
          <div className="col-span-2 my-2">
            <Label label="Type Manager" required="required" />
            <div className="mt-2.5">
              <Select
                name="managertype"
                value={isManagerLevel}
                options={managerLevels}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={managerLevelHandle}
              />
            </div>
          </div>
        </div>

        {/* Other Fields */}
        {["name", "company_name", "email", "mobile", "password", "password_confirmation"].map((field, idx) => (
          <div className="w-full my-2 pb-3" key={idx}>
            <Label
              label={
                field === "password_confirmation"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.replace("_", " ").slice(1)
              }
              required="required"
            />
            <div className="mt-2.5">
              <Input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                id={field}
                value={registerData[field]}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}

        {/* Address Autocomplete */}
        <AddressAutocomplete />

        {/* Remember Me */}
        <div className="flex gap-2 pt-3 pb-3">
          <TableCheckbox />
          <p className="text-lg font-semibold"> Remember Me</p>
        </div>

        {/* Submit */}
        <div className="my-4 submit_button">
          <Button
            type="Submit"
            className="block sm:w-auto w-full rounded-md bg-[#c13e27] px-10 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            is_loding={isLoding}
            disabled={isLoding}
          />
        </div>

        <div>
          <Link href="/login" className="text-[#c13e27] text-lg font-semibold">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};
