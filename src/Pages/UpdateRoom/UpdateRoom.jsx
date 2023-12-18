import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateRoom = () => {
  const navigate = useNavigate();
  const loadedRoom = useLoaderData();
  const { _id, img, name, checkIn, checkOut } = loadedRoom;

  console.log(loadedRoom);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;

    const updatedBooking = {
      checkIn,
      checkOut,
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
            <h1 className="text-5xl font-bold">Update Booking</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
