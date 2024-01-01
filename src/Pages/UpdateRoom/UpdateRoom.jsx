import axios from "axios";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateRoom = () => {
  const navigate = useNavigate();
  const loadedRoom = useLoaderData();
  const { _id, img, name, bookedDates } = loadedRoom;

  const lastIndex = bookedDates.length - 1;

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(bookedDates[0]),
    endDate: new Date(bookedDates[lastIndex]),
    key: "selection",
  });

  const [bookedDate, setBookedDate] = useState([]);
  console.log(bookedDate);

  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({ startDate, endDate });
  };

  console.log(selectedRange);

  const handleUpdate = () => {
    const days = [];
    const currentDate = new Date(selectedRange?.startDate);

    while (currentDate <= new Date(selectedRange?.endDate)) {
      const dateString = currentDate.toString();
      days.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const dateObjects = days?.map((day) => new Date(day));
    setBookedDate(dateObjects);

    const updatedBooking = {
      bookedDates: dateObjects,
    };

    console.log(updatedBooking.bookedDates);

    axios
      .put(
        `https://galaxy-hotel-server.vercel.app/booking/${_id}`,
        updatedBooking
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Booking info has been updated", "success");
          navigate("/my-rooms");
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div className="md:w-1/2 mt-10">
        <img className="w-full rounded-lg mb-10 " src={img} alt="" />
        <h2 className="text-3xl font-semibold mb-5">Package Name: {name}</h2>
      </div>
      <div className="hero min-h-screen -mt-36">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-32">Update Booking</h1>
          </div>

          <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={[selectedRange]}
            rangeColors={["#3d91ff", "#FF0000"]}
          />
          <br />
          <button
            className={`btn btn-primary ${
              bookedDate.length > 0 ? "btn-disabled" : "btn-primary"
            }`}
            onClick={handleUpdate}
          >
            Update Booking{" "}
          </button>

          {/* <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleUpdate} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Check In</span>
                </label>
                <input
                  type="date"
                  placeholder="email"
                  className="input input-bordered text-sm"
                  name="checkIn"
                  defaultValue={checkIn}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Check Out</span>
                </label>
                <input
                  type="date"
                  placeholder="password"
                  className="input input-bordered text-sm"
                  name="checkOut"
                  defaultValue={checkOut}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
