"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MyDatePickerProps {
  onChange: (date: string) => void;
  selectedDate: string;
}

export default function MyDatePicker({
  onChange,
  selectedDate,
}: MyDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date(selectedDate));

  useEffect(() => {
    setStartDate(new Date(selectedDate));
  }, [selectedDate]);
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => {
          onChange(date);
          setStartDate(date);
        }}
        minDate={new Date()} // disabled previous dated
        className="search-input datepicker"
      />
    </>
  );
}
