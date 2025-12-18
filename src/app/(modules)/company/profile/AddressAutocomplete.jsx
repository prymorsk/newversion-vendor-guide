"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Front/UI/Input";

const AddressAutocomplete = ({ users, onChange }) => {
  const [address, setAddress] = useState(users.address || "");
  const [city, setCity] = useState(users.city || "");
  const [state, setState] = useState(users.state || "");
  const [country, setCountry] = useState(users.country || "");
  const [postalCode, setPostalCode] = useState(users.postal_code || "");
  const [latitude, setLatitude] = useState(users.latitude || "");
  const [longitude, setLongitude] = useState(users.longitude || "");

  useEffect(() => {
    // Update local state if users prop changes
    setAddress(users.address || "");
    setCity(users.city || "");
    setState(users.state || "");
    setCountry(users.country || "");
    setPostalCode(users.postal_code || "");
    setLatitude(users.latitude || "");
    setLongitude(users.longitude || "");
  }, [users]);

  useEffect(() => {
    const gmapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const gmapLib = "places";

    if (typeof window !== "undefined" && gmapKey && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapKey}&libraries=${gmapLib}`;
      script.async = true;
      script.onload = () => initializeAutocomplete();
      document.head.appendChild(script);
    } else {
      initializeAutocomplete();
    }
  }, []);

  const initializeAutocomplete = () => {
    const input = document.getElementById("address");
    if (!input || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      fields: ["address_components", "formatted_address", "geometry"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const formattedAddress = place.formatted_address;
      let city, state, country, postalCode;
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      place.address_components.forEach((comp) => {
        const types = comp.types;
        if (types.includes("locality")) city = comp.long_name;
        if (types.includes("administrative_area_level_1")) state = comp.long_name;
        if (types.includes("country")) country = comp.long_name;
        if (types.includes("postal_code")) postalCode = comp.long_name;
      });

      setAddress(formattedAddress);
      setCity(city || "");
      setState(state || "");
      setCountry(country || "");
      setPostalCode(postalCode || "");
      setLatitude(latitude);
      setLongitude(longitude);

      if (onChange) {
        onChange({
          address: formattedAddress,
          city,
          state,
          country,
          postal_code: postalCode,
          latitude,
          longitude,
        });
      }
    });
  };

  return (
    <>
      <Input name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Input type="hidden" name="city" value={city} />
      <Input type="hidden" name="state" value={state} />
      <Input type="hidden" name="country" value={country} />
      <Input type="hidden" name="postal_code" value={postalCode} />
      <Input type="hidden" name="latitude" value={latitude} />
      <Input type="hidden" name="longitude" value={longitude} />
    </>
  );
};

export default AddressAutocomplete;
