import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/reviews?sid=${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id]);

  return (
    <div className="w-[500px] lg:w-1/2 mx-auto mt-16">
      <h2 className="text-center font-semibold text-3xl my-8">
        Customer Reviews
      </h2>

      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews?.length ? (
          <div>
            {reviews?.map((item, index) => (
              <SwiperSlide key={index} item={item}>
                <div className="shadow-md rounded-lg text-center text-black py-5 space-y-5 bg-[#F5F6F7] border border-[#AA8453]">
                  <p className="text-xl font-medium"> {item?.reviews}</p>
                  <p>Reviewed By: {item?.name}</p>
                  <div className="flex items-center justify-center gap-2">
                    <p>Rating: </p>
                    <ReactStars size={20} value={item?.rating} edit={false} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        ) : (
          <h2 className="font-semibold text-2xl text-center">No Reviews Yet</h2>
        )}
      </Swiper>
    </div>
  );
};

export default Reviews;
