import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PostReviews = () => {
  const [reviews, setReviews] = useState("");
  const [number, setNumber] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReviews = () => {
    const allReviews = {
      reviews,
      sid: id,
      name: user.displayName,
      timestamp: new Date(),
      rating: number,
    };

    console.log(allReviews);

    if (user?.email) {
      fetch("http://localhost:5001/review", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(allReviews),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            console.log(data);
            Swal.fire("Success!", "Your review has been added", "success");
          }
        });
    } else {
      Swal.fire("Error!", "You need to login first", "error");
      return navigate("/login");
    }
  };
  return (
    <div className="mt-20">
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
    </div>
  );
};

export default PostReviews;
