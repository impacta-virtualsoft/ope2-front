import React from 'react'
import { UseFormRegister } from 'react-hook-form'

const InputText = ({ id, label }, ...props) => {
  return React.forwardRef<
    HTMLInputElement,
    { id: string; label: string; [key: string]: any } & ReturnType<
      UseFormRegister<UserType>
    >
  >(({ onChange, onBlur }, ref) => (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type="text"
        id={id}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        {...props}
      />
    </>
  ))
}

export default InputText
