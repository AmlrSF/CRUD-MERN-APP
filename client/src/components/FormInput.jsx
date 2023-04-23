import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,

}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
    </div>
    <input
    style={{display:'block'}}
      type={type}
      id={labelName}
      name={name}
      
      className="bg-gray-50 
      border border-gray-300  text-gray-900
       text-sm rounded-lg focus:ring-[#6469ff] 
       focus:border-[#6469ff] 
       outline-none block w-[100%] sm:w-[250px]  p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
    
  </div>
);

export default FormField;