import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem corrupti ipsa quis placeat similique, quibusdam
            delectus? Eligendi, velit soluta odio quam beatae adipisci
            perspiciatis pariatur, nostrum officiis placeat nulla nobis!
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-234-567-7789</li>
            <li>contact@gmailfoever.com</li>
          </ul>
        </div>
      </div>
        <div >  
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025  forever.com - All Right Reserved!</p>
        </div>
    </div>
  );
};

export default Footer;
