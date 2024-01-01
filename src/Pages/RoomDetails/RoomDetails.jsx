import { useLoaderData, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import BookingForm from "../../Components/BookingForm/BookingForm";
import Reviews from "../../Components/Reviews/Reviews";
import PostReviews from "../../Components/Reviews/PostReviews/PostReviews";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
  const { id } = useParams();

  const { img, offers, available, price, description, size } = loadedRoom;

  const { user } = useAuth();
  const [reserved, setReserved] = useState([]);

  axios
    .get(`https://galaxy-hotel-server.vercel.app/booked-room/${id}`)
    .then((res) => {
      setReserved(res.data?.bookedDates);
    });

  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | Room Details </title>
      </Helmet>
      <div className="flex flex-col-reverse lg:flex-row justify-around gap-10">
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
              <span className="text-xl">{available} Rooms </span>
            </p>

            <p className="">
              Discount <br />
              <span className="text-xl">{offers}</span>
            </p>
          </div>
        </div>

        <BookingForm reserved={reserved} user={user} loadedRoom={loadedRoom} />
      </div>
      <Reviews />

      <PostReviews />
    </div>
  );
};

export default RoomDetails;
