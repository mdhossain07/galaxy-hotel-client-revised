import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import BookingForm from "../../Components/BookingForm/BookingForm";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
  // const navigate = useNavigate();
  const { id } = useParams();
  // const [reviews, setReviews] = useState("");
  // const [myReviews, setMyReviews] = useState([]);
  // const [number, setNumber] = useState("");
  const { _id, img, name, offers, available, price, description, size } =
    loadedRoom;

  const { user } = useAuth();
  const [reserved, setReserved] = useState([]);
  // console.log(id);

  // console.log(reserved);

  axios.get(`http://localhost:5001/booked-room/${id}`).then((res) => {
    // console.log(res.data.bookedDates);
    setReserved(res.data?.bookedDates);
  });
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5001/review?sid=${_id}`)
  //     .then((res) => setMyReviews(res.data));
  // }, [_id]);

  // const handleReviews = () => {
  //   const allReviews = {
  //     reviews,
  //     sid: _id,
  //     name: user.displayName,
  //     timestamp: new Date(),
  //     rating: number,
  //   };

  //   if (user?.email) {
  //     fetch("http://localhost:5001/review", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(allReviews),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.insertedId) {
  //           console.log(data);
  //           Swal.fire("Success!", "Your review has been added", "success");
  //         }
  //       });
  //   } else {
  //     Swal.fire("Error!", "You need to login first", "error");
  //     return navigate("/login");
  //   }
  // };

  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | Room Details </title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-around gap-10">
        <div className="md:w-1/2 mt-10">
          <img className="w-full rounded-lg mb-10 " src={img} alt="" />
          <h2 className="text-2xl font-semibold mb-5">Description of Room</h2>
          <p className="w-full mb-10">{description}</p>
          <div className="flex flex-col lg:flex-row  text-center md:mx-auto bg-[#F5F6F7] p-5 rounded-xl border border-[#AA8453] gap-5 md:gap-20 text-md font-semibold mt-10">
            <p className="">
              Room Size <br /> <span className="text-xl">{size}</span>
            </p>

            <p className="">
              Price <br /> <span className="text-xl">${price}/night</span>
            </p>

            <p className="">
              Availability <br />
              <span className="text-xl">{available} Rooms</span>
            </p>

            <p className="">
              Discount <br />
              <span className="text-xl">{offers}</span>
            </p>
          </div>

          {/* Show Review Area */}

          {/* <div className="mt-20">
            <h2 className="text-2xl font-semibold">Reviews: </h2>
            {myReviews.length ? (
              <div>
                {myReviews.map((review, index) => (
                  <Reviews user={user} key={index} review={review}></Reviews>
                ))}
              </div>
            ) : (
              <h2 className="font-semibold text-2xl text-center">
                No Reviews Yet
              </h2>
            )}
          </div> */}

          {/* Review Textarea */}
          {/* <div className="mt-20">
            <h2 className="text-2xl font-semibold">Post a Review </h2>
            <textarea
              className="border-2"
              onBlur={(e) => setReviews(e.target.value)}
              cols="80"
              rows="6"
            ></textarea>
            <label htmlFor="">
              Rating on 5:
              <input
                onBlur={(e) => setNumber(e.target.value)}
                type="number"
                name="5"
                id=""
                className="ml-3 border-2"
              />
            </label>
            <br />
            <button onClick={handleReviews} className="btn btn-neutral mt-10">
              Submit
            </button>
          </div> */}
        </div>

        <BookingForm reserved={reserved} user={user} loadedRoom={loadedRoom} />
      </div>
    </div>
  );
};

// const Reviews = ({ review }) => {
//   const { reviews, name, timestamp, rating } = review;
//   return (
//     <div className="mt-5">
//       <p className="text-xl text-blue-600 font-medium">{reviews}</p>
//       <p className="font-medium">Date: {timestamp}</p>
//       <p className="font-medium">Raitng: {rating}</p>
//       <p className="font-medium">
//         Review By: <span>{name}</span>{" "}
//       </p>
//       {/* <img className="rounded-full" src={user?.photoURL} alt="" /> */}
//     </div>
//   );
// };

export default RoomDetails;
