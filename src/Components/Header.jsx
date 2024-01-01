import { Link } from "react-router-dom";
import banner from "../assets/images/banner-1.jpg";
import banner2 from "../assets/images/room-2.jpg";
// import banner3 from "../assets/images/room-4.jpg";

const Header = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div
            className="hero h-[80vh] rounded-lg"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <h1 className="mb-5 text-4xl font-bold">
                  UNIQUE PLACE AND LUXURY HOTEL
                </h1>
                <p className="mb-5">LIFE ENJOY WITH THE GREAT MOMENTS</p>
                <Link to="/rooms">
                  <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
                    BOOK NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="hero h-[80vh] rounded-lg"
            style={{
              backgroundImage: `url(${banner2})`,
            }}
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <h1 className="mb-5 text-4xl font-bold">
                  UNIQUE PLACE AND LUXURY HOTEL
                </h1>
                <p className="mb-5">LIFE ENJOY WITH THE GREAT MOMENTS</p>
                <Link to="/rooms">
                  <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
                    BOOK NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
