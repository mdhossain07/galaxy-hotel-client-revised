import { useState } from "react";
import { DateRange } from "react-date-range";

import format from "date-fns/format";
import addDays from "date-fns/addDays";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BookingForm = () => {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection,",
    },
  ]);

  console.log(selectedRange);

  const handleBooking = () => {
    const startDate = selectedRange[0].startDate;
    const endDate = selectedRange[0].endDate;

    console.log(`${startDate} to ${endDate}`);
  };
  return (
    <div>
      <h2>Booking Form</h2>

      <DateRange
        editableDateInputs={true}
        onChange={(item) => setSelectedRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={selectedRange}
        color={"#3d91ff"}
        rangeColors={["#3d91ff", "#3ecf8e", "#fed14c"]}
      />
      <button onClick={handleBooking}>Book Room </button>
    </div>
  );
};

export default BookingForm;
