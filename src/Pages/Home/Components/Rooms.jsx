import { Link } from "react-router-dom";
import room1 from "../../../assets/images/room-1.jpg";
import room2 from "../../../assets/images/room-2.jpg";
import room4 from "../../../assets/images/room-4.jpg";
import room3 from "../../../assets/images/room-6.jpg";

const Rooms = () => {
  return (
    <div>
      <h2 className="text-4xl font-semibold mt-16 text-center">
        Check Our Rooms
      </h2>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center mt-10 "
      >
        <img className="rounded-lg" src={room1} alt="" />
        <img className="rounded-lg" src={room2} alt="" />
        <img className="rounded-lg" src={room3} alt="" />
        <img className="rounded-lg" src={room4} alt="" />
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="flex justify-center mt-10"
      >
        <Link to="/rooms">
          <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
            BOOK NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Rooms;
