// components/AddressAutocomplete.js
"use client";

import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import { useState, useEffect, useRef } from "react";

const AddressAutocomplete = ({ users }) => {
  const [postalCode, setPostalCode] = useState(users?.zip_code || "");
  const [address, setAddress] = useState(users?.address || "");
  const [city, setCity] = useState(users?.city || "");
  const [state, setState] = useState(users?.state || "");
  const [country, setCountry] = useState(users?.country || "");
  const [latitude, setLatitude] = useState(users?.latitude || "");
  const [longitude, setLongitude] = useState(users?.longitude || "");
  const [form, setForm] = useState([]);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    const gmapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const gmapLib = "places";

    if (typeof window !== "undefined" && !window.google) {
      // Load Google Maps API script dynamically
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapKey}&libraries=${gmapLib}`;
      script.async = true;
      script.onload = () => {
        initializeAutocomplete();
      };
      document.head.appendChild(script);
    } else if (window.google) {
      initializeAutocomplete();
    }
  }, []);

  const initializeAutocompleteReset = () => {
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPostalCode("");
    setLatitude("");
    setLongitude("");
    console.log("address changed for new...");
  };

  const initializeAutocomplete = () => {
    if (!autocompleteRef.current) return;

    const options = {
      fields: ["place_id", "address_components", "formatted_address", "geometry", "name"],
      types: ["address"],
      componentRestrictions: { country: "us" },
    };

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, options);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components || !place.geometry) return;

      setAddress(place.formatted_address);

      let cityVal = "";
      let stateVal = "";
      let countryVal = "";
      let zipCode = "";

      const components = place.address_components;

      for (let i = 0; i < components.length; i++) {
        const types = components[i].types;

        if (types.includes("postal_code")) zipCode = components[i].short_name;
        if (types.includes("locality")) cityVal = components[i].long_name;
        if (types.includes("administrative_area_level_1")) stateVal = components[i].long_name;
        if (types.includes("country")) countryVal = components[i].long_name;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setCity(cityVal);
      setState(stateVal);
      setCountry(countryVal);
      setPostalCode(zipCode);
      setLatitude(lat);
      setLongitude(lng);
    });
  };

  const handleFormAddress = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 pb-2">
        <div className="col-span-2 my-2">
          <Label label="Address(Type Zip Code...)" required="required" />
          <div className="mt-2.5">
            <Input
              name="address"
              id="address"
              value={address}
              ref={autocompleteRef}
              onChange={initializeAutocompleteReset}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 pb-2">
        <div className="col-span-2 my-2">
          <Label label="City" required="required" />
          <div className="mt-2.5">
            <Input type="hidden" name="city" value={city} />
            <Input type="text" name="cityshow" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 pb-2">
        <div className="col-span-2 my-2">
          <Label label="State" required="required" />
          <div className="mt-2.5">
            <Input type="hidden" name="state" value={state} />
            <Input type="text" name="stateshow" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 pb-2">
        <div className="col-span-2 my-2">
          <Label label="Country" required="required" />
          <div className="mt-2.5">
            <Input type="hidden" name="country" value={country} />
            <Input type="text" name="countryshow" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 pb-2">
        <div className="col-span-2 my-2">
          <Label label="Zip" />
          <div className="mt-2.5">
            <Input type="hidden" name="postal_code" value={postalCode} />
            <Input type="text" name="postal_codeshow" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>
        </div>
      </div>

      <Input type="hidden" name="latitude" value={latitude} />
      <Input type="hidden" name="longitude" value={longitude} />
    </>
  );
};

export default AddressAutocomplete;
