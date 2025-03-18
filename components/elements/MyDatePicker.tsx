
'use client'
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface MyDatePickerProps {
	onChange: (date: string) => void;
}

export default function MyDatePicker({onChange}:MyDatePickerProps) {
	const [startDate, setStartDate] = useState(new Date())
  return (
	<>
		<DatePicker selected={startDate} onChange={(date:any) => {
			onChange(date);
			setStartDate(date)

		}} className="search-input datepicker" />
	</>
  )
}
