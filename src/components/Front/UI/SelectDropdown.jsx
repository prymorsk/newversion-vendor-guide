import React, { useState } from 'react';

const SelectDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    onSelect(newValue);
    console.log(newValue)
  };

  return (
    <select
    className="w-full bg-gray-200 border border-gray-200 text-[#c13e27] text-lg py-3 px-4 pr-8 mb-3 rounded"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      {/* <option value="" disabled>
        Select an option
      </option> */}
      {options && options.map((option,index) => (
        <option key={index} value={index}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;