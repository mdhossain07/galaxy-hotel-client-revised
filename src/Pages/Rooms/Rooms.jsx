import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import star from "../../assets/icons/star_1_.png";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const Rooms = () => {
  const { loading } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [filterRooms, setFilterRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/rooms").then((data) => {
      setRooms(data.data);
      // setFilterRooms(data.data);
    });
  }, []);

  useEffect(() => {
    const filteredRooms = rooms.filter((room) => {
      const price = room.price;
      return (
        (!lowPrice || price >= lowPrice) && (!highPrice || price <= highPrice)
      );
    });
    setFilterRooms(filteredRooms);
  }, [lowPrice, highPrice, rooms]);

  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | Rooms </title>
      </Helmet>

      {/* Price Filtering */}

      <div className="space-y-5 ml-2 lg:ml-16 mt-10">
        <h2 className="text-xl font-medium">Filter By Price Range</h2>

        <input
          type="text"
          placeholder="Min Price"
          value={lowPrice}
          className="border-2 border-[#AA8453] rounded-md indent-3 h-[30px] w-[200px]"
          onChange={(e) => setLowPrice(parseFloat(e.target.value))}
        />
        <input
          type="text"
          placeholder="Max Price"
          value={highPrice}
          className="border-2 border-[#AA8453] rounded-md indent-3 h-[30px] w-[200px] ml-10"
          onChange={(e) => setHighPrice(parseFloat(e.target.value))}
        />
      </div>

      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          {filterRooms?.map((room) => (
            <RoomsCard key={room._id} room={room}></RoomsCard>
          ))}
        </div>
      )}
    </div>
  );
};

const RoomsCard = ({ room }) => {
  const { name, description, img, price, rating, available, _id } = room;
  return (
    <div>
      <div className="flex gap-5 mt-10 items-center">
        <NavLink to={`/room/${_id}`}>
          <img
            className="w-full md:w-[250px] h-[200px] rounded-lg "
            src={img}
            alt=""
          />
        </NavLink>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="md:w-[270px]">{description.slice(0, 80)}...</p>
          <p className="font-medium">Rooms Available: {available}</p>
          <div className="flex items-center gap-5">
            <div className="flex gap-1 last:items-center">
              <span>
                <img src={star} alt="" />
              </span>

              <p className="font-medium text-sm">{rating} (20) </p>
            </div>

            <p className="font-medium text-lg">
              ${price}
              <span className="text-sm">/night</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

RoomsCard.propTypes = {
  room: PropTypes.object,
};

export default Rooms;
