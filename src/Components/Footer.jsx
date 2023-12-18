import { Link } from "react-router-dom";
import logo from "../assets/images/Galaxy Luxury Hotel Logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer w-[630px] md:w-full p-10 bg-[#222222] text-[#A6A6A6] mt-20">
        <aside>
          <img src={logo} alt="" />
        </aside>

        <nav className="md:mt-10">
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        <nav className="md:mt-10">
          <header className="footer-title">Legal</header>

          <Link to="/terms-of-use" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/privacy-policy" className="link link-hover">
            Privacy policy
          </Link>
          <a className="link link-hover">Cookie policy</a>
        </nav>

        <form className="md:mt-10">
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="">Enter your email address</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
              />
              <button className=" p-3.5 bg-[#AA8453] text-white border-none absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
