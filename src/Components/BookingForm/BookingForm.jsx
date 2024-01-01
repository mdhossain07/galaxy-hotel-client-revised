import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const BookingForm = ({ user, loadedRoom, reserved }) => {
  const { _id, img, name, price } = loadedRoom;

  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const [bookedDate, setBookedDate] = useState([]);

  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({ startDate, endDate });
  };

  const reservedDateObjects = reserved?.map((item) => new Date(item));

  const handleBooking = () => {
    const days = [];
    const currentDate = new Date(selectedRange?.startDate);

    while (currentDate <= new Date(selectedRange?.endDate)) {
      const dateString = currentDate.toString();
      days.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const dateObjects = days?.map((day) => new Date(day));
    setBookedDate(dateObjects);

    const booking = {
      roomId: _id,
      img,
      name,
      price,
      bookedDates: dateObjects,
      email: user?.email,
    };

    try {
      if (user) {
        fetch("https://galaxy-hotel-server.vercel.app/booking", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(booking),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire("Success!", "Booking Successfull", "success");
              navigate("/my-rooms");
            }
          });
      } else {
        Swal.fire("Error!", "You need to Login First", "error");
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-medium my-10">Booking Form</h2>

      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={[selectedRange]}
        rangeColors={["#c99f68", "#FF0000"]}
        disabledDates={reservedDateObjects}
      />
      <br />
      <button
        className={`w-full mt-5 p-3 rounded-lg bg-[#AA8453] hover:bg-[#c99f68] text-white border-none text-md ${
          bookedDate.length > 0 ? "btn-disabled" : "btn-primary"
        }`}
        onClick={handleBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
};

BookingForm.propTypes = {
  user: PropTypes.object,
  loadedRoom: PropTypes.object,
  reserved: PropTypes.array,
};

export default BookingForm;
