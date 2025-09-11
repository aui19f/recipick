import { InputHTMLAttributes } from "react";

export type FormOption = {
  id: string;
  label: string;
};

// 체크박스, 라디오 버튼, 셀렉트 등 여러 값을 선택하는 컴포넌트의 공통 프롭
export interface FormMultiProp {
  name: string;
  options: FormOption[];
  selected: string[] | string;
  className?: string;
}

// onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // 또는 HTMLInputElement

// 텍스트 입력 필드나 단일 선택 컴포넌트의 공통 프롭
export interface FormSingleProp extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
  className?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

export interface FormRadio extends FormMultiProp {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface FormSelectbox extends FormMultiProp {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
