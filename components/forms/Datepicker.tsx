// https://github.com/Hacker0x01/react-datepicker

//
/**
 * 한국어설정
 * npm install date-fns
 *
 */
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
export default function DatePickerForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    console.log(">>", date);
    // onChange(date); // 부모로 전달
  };

  return (
    <DatePicker
      selected={startDate}
      locale={ko}
      dateFormat="yyyy/MM/dd"
      onChange={handleChange}
    />
  );
}
