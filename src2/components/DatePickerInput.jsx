import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Search from '@/app/(front)/vendors/Search.module.css';

import "react-datepicker/dist/react-datepicker.css";

export const DatePickerInput = (props) => {
    const date2 = new Date();
    date2.setDate(date2.getDate() + 1);
    // console.log(props);
    const [startDate, setStartDate] = useState(date2);
    function selectDateSet(e) {
      
	   if(e){
		   
        setStartDate(e);
        const year = e.getFullYear();
        const month = e.getMonth() + 1; // Adding 1 to get the month in the range 1 to 12
        const day = e.getDate(); 
        props.setCloseDate(`${day}-${month}-${year}`);
		
	   }
	   else{
		  setStartDate(date2); 

	   }
	   
		
    }
    return (
        <DatePicker showIcon openToDate={date2} dateFormat="dd-MM-yyyy" minDate={date2} wrapperClassName={`block bg-[#e3e3e3cc] w-full rounded-md border-0 px-3.5 py-3 t    ext-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 ${Search.datepickerInput}`}  className="block bg-[#e3e3e3cc] w-full" selected={startDate} onChange={selectDateSet} isClearable showYearDropdow  />
    );
};