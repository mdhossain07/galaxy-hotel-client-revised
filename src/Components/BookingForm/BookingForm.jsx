import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const BookingForm = ({ user, loadedRoom, reserved }) => {
  const { _id, img, name, offers, available, price, description, size } =
    loadedRoom;

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
  // console.log(reservedDateObjects);

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
        fetch("http://localhost:5001/booking", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(booking),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire("Success!", "Booking Successfull", "success");
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

  // console.log(bookedDate);

  return (
    <div>
      <h2>Booking Form</h2>

      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={[selectedRange]}
        rangeColors={["#3d91ff", "#FF0000"]}
        disabledDates={reservedDateObjects}
      />
      <br />
      <button
        className={`btn btn-primary ${
          bookedDate.length > 0 ? "btn-disabled" : "btn-primary"
        }`}
        onClick={handleBooking}
      >
        Book Room{" "}
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
