import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.styles.css';
export default function TableDatePicker({ onInputChange, date }) {
	return (
		<DatePicker
			popperPlacement="left"
			selected={date}
			maxDate={new Date()}
			dateFormat="yyyy-MM-dd"
			onChange={onInputChange}
		/>
	);
}
