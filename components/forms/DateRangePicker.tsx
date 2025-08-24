import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangePicker({
  range,
  onChange,
}: DateRangePickerProps) {
  const { startDate, endDate } = range;

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    onChange({ startDate: start, endDate: end });
  };

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      locale={ko}
      dateFormat="yyyy/MM/dd"
      placeholderText="시작일 ~ 종료일"
      isClearable
      className="border border-gray-400 h-12 px-1 w-full"
    />
  );
}
