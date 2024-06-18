import React from "react";
import { BiLogIn } from "react-icons/bi";

const LoginBoxes = ({ title, link }) => {
  return (
    <div className="px-2 flex items-center">
      <a href={link} className="cursor-pointer">
        <div className="bg-white w-[220px] border py-5 shadow-xl rounded-lg flex items-center justify-center flex-col">
          <p className="text-[16px] font-medium text-[#007bff] mb-4">{title}</p>
          <BiLogIn className="text-4xl" />
        </div>
      </a>
    </div>
  );
};

export default LoginBoxes;
