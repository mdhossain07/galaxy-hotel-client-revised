import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const MyRooms = () => {
  const { user, loading } = useAuth();
  const [myRooms, setMyRooms] = useState([]);

  const url = `http://localhost:5001/booking?email=${user?.email}`;

  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => setMyRooms(res.data));
  }, [url]);

  const handleRemove = (id, checkIn) => {
    console.log("delete", id, checkIn);

    const checkInDate = moment(checkIn);
    // console.log(checkInDate);
    const copyDate = checkInDate.clone();
    const cancelDate = copyDate.subtract(1, "day");
    // console.log(cancelDate);
    const currentDate = moment();
    // console.log(currentDate);
    const checkCancel = currentDate.isBefore(cancelDate);
    // console.log(checkCancel);

    if (checkCancel) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5001/booking/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data.deletedCount > 0) {
                Swal.fire("Success!", "Booking Cancellation Done", "success");
                const remaining = myRooms.filter((room) => room._id !== id);
                setMyRooms(remaining);
              }
            });
        }
      });
    } else {
      Swal.fire("Error!", "Booking Cancellation Period Expired", "error");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | My Rooms </title>
      </Helmet>
      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <div className="">
          {myRooms.map((room, index) => (
            <BookedRoom
              key={index}
              handleRemove={handleRemove}
              room={room}
            ></BookedRoom>
          ))}
        </div>
      )}
    </div>
  );
};

const BookedRoom = ({ room, handleRemove }) => {
  const { img, name, price, _id, checkIn } = room;
  return (
    <div className="flex flex-col md:flex-row gap-10 mt-10 items-center">
      <img className="w-[400px] rounded-lg" src={img} alt="" />
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Package Name: {name}</h2>
        <p className="font-semibold">Price: ${price}</p>
        <div className="flex gap-5">
          <button
            onClick={() => handleRemove(_id, checkIn)}
            className="btn btn-neutral"
          >
            Remove
          </button>
          <Link to={`/update-room/${_id}`}>
            <button className="btn btn-neutral">Update Date</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

BookedRoom.propTypes = {
  room: PropTypes.object,
};

BookedRoom.propTypes = {
  handleRemove: PropTypes.func,
};

export default MyRooms;
