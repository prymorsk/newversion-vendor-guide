// components/AddressAutocompleteFront.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/Front/UI/Input";
import Script from "next/script";

const AddressAutocomplete = (props) => {
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const autocompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !autocompleteRef.current || !window.google) return;

    try {
      // Initialize Google Maps Autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"] } // restrict to addresses
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.address_components || !place.geometry) return;

        let zip = "";
        let cityVal = "";
        let stateVal = "";
        let countryVal = "";

        for (const comp of place.address_components) {
          if (comp.types.includes("postal_code")) zip = comp.short_name;
          if (comp.types.includes("locality")) cityVal = comp.long_name;
          if (comp.types.includes("administrative_area_level_1")) stateVal = comp.long_name;
          if (comp.types.includes("country")) countryVal = comp.long_name;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setPostalCode(zip);
        setCity(cityVal);
        setStateName(stateVal);
        setCountry(countryVal);
        setLatitude(lat);
        setLongitude(lng);

        // Update parent props
        props.setPostalCode(zip);
        props.setLocality(cityVal);
        props.setGeoLatitude(lat);
        props.setGeoLongitude(lng);
      });
    } catch (error) {
      console.error("Error initializing Autocomplete:", error);
    }
  }, [scriptLoaded]);

  return (
    <>
      {/* Load Google Maps JS API asynchronously */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&v=weekly`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <div className="div">
        <Input
          ref={autocompleteRef}
          className="w-full focus:!outline-none focus:border-red-700 py-4 border-gray-300 xl:w-[370px] lg:w-[295px] h-[1.6rem] placeholder:text-sm border-solid rounded border-[1px] pl-2"
          placeholder="Start With Zip Code"
          name="address"
          defaultValue={props.val}
        />
        <p className="text-red-300">* start with zip code</p>
      </div>

      {/* Hidden fields to store data */}
      <Input type="hidden" name="city" value={city} />
      <Input type="hidden" name="state" value={stateName} />
      <Input type="hidden" name="country" value={country} />
      <Input type="hidden" name="postal_code" value={postalCode} />
      <Input type="hidden" name="latitude" value={latitude} />
      <Input type="hidden" name="longitude" value={longitude} />
    </>
  );
};

export default AddressAutocomplete;
