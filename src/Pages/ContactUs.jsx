import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    console.log(name, email, message);

    form.reset();

    Swal.fire("Success!", "Message Sent successfully!", "success");
  };
  return (
    <div className="hero ">
      <Helmet>
        <title>Galaxy Luxury Hotel | Contact Us </title>
      </Helmet>
      <div className="hero-content flex-col">
        <div className="card flex-shrink-0 md:w-[550px] mx-auto shadow-2xl ">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mt-10">Contact Us</h2>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="font-semibold label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input bg-[#F3F3F3] text-xs"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-semibold label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input bg-[#F3F3F3] text-xs"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-semibold label-text">Your Message</span>
              </label>
              <textarea
                type="text"
                className="input bg-[#F3F3F3] text-xs"
                placeholder="Write Your Message"
                cols="30"
                rows="5"
                name="message"
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-[#AA8453] text-white border-none">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
