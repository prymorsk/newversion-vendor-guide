// components/AddressAutocomplete.js
import Input from "@/components/Front/UI/Input";
import { useState } from "react";
import { useEffect } from 'react';

const AddressAutocomplete = ({users}) => {
  // console.log(users)
    const [postalCode, setPostalCode] = useState(users.postal_code);
    const [city, setCity] = useState(users.city);
    const [address, setAddress] = useState(users.address);
    const [state, setState] = useState(users.state);
    const [country, setCountry] = useState(users.country);
    const [latitude, setLatitude] = useState(users.latitude);
    const [longitude, setLongitude] = useState(users.longitude);
  useEffect(() => {
    const gmapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const gmapLib = 'places';

    if (typeof window !== 'undefined') {
      // Load Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapKey}&libraries=${gmapLib}`;
      script.async = true;
      script.onload = () => {
        initializeAutocomplete();
      };
      document.head.appendChild(script);
    }
  }, []);

  const initializeAutocomplete = () => {
    const address = document.getElementById('address');
    const options = {
      fields: ['address_components', 'formatted_address', 'geometry', 'name'],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(address, options);

    const componentForm = {
      postal_code: 'short_name',
    };

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address;
      setAddress(formattedAddress)
      const addressComponents = place.address_components;
      let city, state, country, zipCode;
       const latitude = place.geometry.location.lat();
       const longitude = place.geometry.location.lng();

      for (let i = 0; i < addressComponents.length; i++) {
        const addressType = addressComponents[i].types[0];

        if (componentForm[addressType]) {
          const val = addressComponents[i][componentForm[addressType]];
          if (addressType === 'postal_code') {
            zipCode = val;
          }
        }

        if (addressComponents[i].types.includes('locality')) {
          city = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('administrative_area_level_1')) {
          state = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('country')) {
          country = addressComponents[i].long_name;
        }
      }
                setCity(city);
                setCountry(country);
                setState(state);
                setPostalCode(zipCode);
                setLatitude(latitude);
                setLongitude(longitude);

      // Update your state or perform other actions with the obtained data
    });
  };

  return (
    <>
    <Input name="address" id="address" value={address}/>
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
