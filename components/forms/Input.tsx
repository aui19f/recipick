import { FormSingleProp } from "@/types/ui";

export default function Input({
  name,
  error,
  onChange,
  value,
  className,
  ...rest //  기본 스타일 외에 필요한 모든 HTML 속성 사용
}: FormSingleProp) {
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={`border border-gray-400 h-12 px-1 w-full ${className}`}
      />
      {error ? <p>{error}</p> : null}
    </>
  );
}
