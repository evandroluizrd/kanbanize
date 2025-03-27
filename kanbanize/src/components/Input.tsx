import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean; // Se é um campo com botão de mostrar senha
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  showToggle = false,
}: InputProps) {
  const [show, setShow] = useState(false);

  const inputType = showToggle ? (show ? 'text' : 'password') : type;

  return (
    <div className="relative w-full mb-3">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded pr-10"
      />
      {showToggle && (
        <span
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
}
