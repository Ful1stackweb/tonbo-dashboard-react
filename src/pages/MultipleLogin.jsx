import React from "react";
import LoginBoxes from "../components/LoginBoxes";

const MultipleLogin = () => {
  const logins = [
    {
      id: 1,
      title: "Assembly",
      link: "/login/assembly",
    },
    {
      id: 2,
      title: "Calibration",
      link: "/login/calibration",
    },
    {
      id: 3,
      title: "Post Calibration",
      link: "/login/post-calibration",
    },
    {
      id: 4,
      title: "Detector Testing",
      link: "/login/detector-testing",
    },
    {
      id: 5,
      title: "Rejection & RMA",
      link: "/login/rejection-rma",
    },
  ];

  return (
    <div className="flex justify-center mt-10">
      {logins.map((login) => (
        <LoginBoxes key={login.id} title={login.title} link={login.link} />
      ))}
    </div>
  );
};

export default MultipleLogin;
