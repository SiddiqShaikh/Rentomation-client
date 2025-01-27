import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock data: Array of booked date ranges
const mockBookedRanges = [
  { start: new Date("2024-09-02"), end: new Date("2024-09-05") },
  { start: new Date("2024-09-10"), end: new Date("2024-09-12") },
  { start: new Date("2024-09-15"), end: new Date("2024-09-17") },
];

const PropertyBookingCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  // Function to check if a specific date is within any booked range
  const isDateInBookedRange = (date: Date) => {
    return mockBookedRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  // Function to check if the selected range overlaps with any booked range
  const isRangeBlocked = (start: Date, end: Date) => {
    return mockBookedRanges.some(
      (range) => start <= range.end && end >= range.start
    );
  };

  // Handle the date change
  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;

      if (start && end) {
        if (isRangeBlocked(start, end)) {
          alert(
            "The selected date range is already booked. Please choose another range."
          );
          setSelectedDates([null, null]);
        } else {
          setSelectedDates([start, end]);
        }
      } else {
        setSelectedDates([start, end]); // Temporarily set until the end date is picked
      }
    } else {
      setSelectedDates([null, null]);
    }
  };

  return (
    <div>
      <h2>Check in-out</h2>
      <DatePicker
        selected={selectedDates[0]} // Ensure selected is Date | null
        onChange={handleDateChange}
        startDate={selectedDates[0] ?? undefined} // Date | null (not undefined)
        endDate={selectedDates[1] ?? undefined} // Date | null (not undefined)
        selectsRange
        filterDate={(date) => !isDateInBookedRange(date)}
        minDate={new Date()} // Disable past dates
        placeholderText="Select a date range"
        className="w-full"
      />
    </div>
  );
};

export default PropertyBookingCalendar;
