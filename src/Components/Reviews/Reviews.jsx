import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
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
    <div>
      <h2>Reviews</h2>

      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews?.length ? (
          <div>
            {reviews?.map((item, index) => (
              <SwiperSlide key={index}>{item?.reviews}</SwiperSlide>
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
