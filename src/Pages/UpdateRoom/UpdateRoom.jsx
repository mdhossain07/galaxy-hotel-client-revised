import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateRoom = () => {
  const navigate = useNavigate();
  const loadedRoom = useLoaderData();
  const { _id, img, name, bookedDates } = loadedRoom;

  const startBooking = new Date(loadedRoom?.bookedDates[0]);
  // const actualDate = startBooking.setDate(startBooking.getDate() - 1);
  // console.log(startBooking, actualDate);
  const lastIndex = loadedRoom?.bookedDates.length - 1;
  const lastBooking = new Date(loadedRoom?.bookedDates[lastIndex]);
  console.log(startBooking, lastBooking);

  const [selectedRange, setSelectedRange] = useState({
    startDate: startBooking,
    endDate: null,
    key: "selection",
  });

  const [bookedDate, setBookedDate] = useState([]);

  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({ startDate, endDate });
  };

  // const reservedDateObjects = reserved?.map((item) => new Date(item));

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

    console.log(updatedBooking);

    fetch(`http://localhost:5001/booking/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
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
            // disabledDates={reservedDateObjects}
          />
          <br />
          <button
            className={`btn btn-primary ${
              bookedDate.length > 0 ? "btn-disabled" : "btn-primary"
            }`}
            onClick={handleUpdate}
          >
            Book Room{" "}
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
