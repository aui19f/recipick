import { InputHTMLAttributes } from "react";

interface IFormInputProps {
  name: string;
  error?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  error,
  onChange,
  value,
  ...rest
}: IFormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className="border border-gray-400"
      />
      {error ? <p>{error}</p> : null}
      {/* {errors ? errors.map((err, index) => <p key={index}>{err}</p>) : null} */}
    </>
  );
}
