// components/AddressAutocomplete.js
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import { useState } from "react";
import { useEffect } from 'react';

const AddressAutocomplete = ({users}) => {
  // console.log(users)
    const [postalCode, setPostalCode] = useState(users?.postal_code);
    const [city, setCity] = useState(users?.city);
    const [address, setAddress] = useState(users?.address);
    const [country, setCountry] = useState(users?.country);
    const [latitude, setLatitude] = useState(users?.latitude);
    const [longitude, setLongitude] = useState(users?.longitude);
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

  const initializeAutocomplete = (current_address) => {
    const address2 = document.getElementById('address');
    setAddress(current_address)
    const options = {
      fields: ['address_components', 'formatted_address', 'geometry', 'name'],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(address2, options);

    const componentForm = {
      postal_code: 'short_name',
    };

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address;
      
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
                setPostalCode(zipCode);
                setLatitude(latitude);
                setLongitude(longitude);

      // Update your state or perform other actions with the obtained data
    });
  };

  return (
    <>
    
    <Input type="hidden" name="latitude" value={latitude} />
    <Input type="hidden" name="longitude" value={longitude} /> 
      <div className="col-span-2 my-2 pb-6" >
          <Label label="Address" required="required" />
              <div className="mt-2.5">
                  <Input name="address" id="address" value={address} onchange={(e)=>{initializeAutocomplete(e.taget.value)}}/>
              </div>
        
      </div>                
      <div className="col-span-1 my-2 pb-6" >
          <Label label="City" required="required" />
              <div className="mt-2.5">
                   <Input type="text" name="city" value={city} onchange={(e)=>{setCity(e.taget.value)}} />
              </div>
      </div> 
      <div className="col-span-1 my-2 pb-6" >
          <Label label="Country" required="required" />
              <div className="mt-2.5">
              <Input type="text" name="country" value={country} onchange={(e)=>{setCountry(e.taget.value)}} />
              </div>
      </div>                 
    
      <div className="col-span-1 my-2 pb-6" >
          <Label label="Postal Code" required="required" />
              <div className="mt-2.5">
                   <Input type="text" name="postal_code" value={postalCode} onchange={(e)=>{setPostalCode(e.taget.value)}} />
              </div>
      </div>         
   

    </>
  );
};

export default AddressAutocomplete;
