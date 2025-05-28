import assets from "../assets/asset";
import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

const Team = () => {
  const team = [
    { id: 1, name: "Alice Johnson", role: "Frontend Developer", image: assets.shape },
    { id: 2, name: "Bob Smith", role: "Backend Developer", image: assets.shape },
    { id: 3, name: "Carol Williams", role: "UI/UX Designer", image: assets.shape },
  ];

  const [teamIndex, setTeamIndex] = useState(0);
  const memberRefs = useRef([]);

  const handleNext = () => {
    setTeamIndex((teamIndex + 1) % team.length);
  };

  const handlePrev = () => {
    setTeamIndex((teamIndex - 1 + team.length) % team.length);
  };

  useEffect(() => {
    if (memberRefs.current[teamIndex]) {
      memberRefs.current[teamIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [teamIndex]);

  return (
    <div className="bg-[#5a5a5a] bg-opacity-20 rounded-lg py-10 overflow-hidden">
  {/* Title */}
  <div className="flex items-center justify-end mb-10">
    <span className="text-white text-4xl sm:text-5xl">Our</span>
    <span
      className="text-white text-4xl sm:text-5xl shadow-lg w-[190px] h-[100px] flex items-center justify-start"
      style={{ backgroundImage: `url(${assets.rectangle56})` }}
    >
      Team
    </span>
  </div>

  {/* Mobile / Tablet View */}
  <div className="lg:hidden flex gap-4 px-4 sm:px-10 justify-center items-center">
    {/* Left Arrow */}
    <button onClick={handlePrev} aria-label="Previous member">
      <IoMdArrowDropleftCircle className="text-white text-4xl sm:text-5xl hover:scale-110 transition" />
    </button>

    <div className="overflow-x-auto scroll-smooth whitespace-nowrap hide-scroll max-w-[50vw] sm:max-w-[60vw] md:max-w-[400px] flex">
      {team.map((member, index) => (
        <div
          key={member.id}
          ref={(el) => (memberRefs.current[index] = el)}
          className={`w-[50vw] sm:w-[50vw] md:w-[400px] flex-shrink-0 text-center transition-transform duration-500 ${
            index === teamIndex ? "scale-100" : "scale-95 opacity-60"
          } flex flex-col justify-center items-center mx-auto`}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-[40vw] sm:w-[30vw] md:w-[400px] sm:h-auto object-cover rounded-full mb-4"
          />
          <p className="text-white font-semibold text-base sm:text-lg">{member.name}</p>
          <p className="text-gray-400 text-sm mt-1">{member.role}</p>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button onClick={handleNext} aria-label="Next member">
      <IoMdArrowDroprightCircle className="text-white text-4xl sm:text-5xl hover:scale-110 transition" />
    </button>
  </div>

  {/* Desktop View */}
  <div className="hidden lg:flex w-full justify-center items-center whitespace-nowrap px-4 mx-auto">
    {team.map((member, index) => (
      <div
        key={member.id}
        className="flex-shrink-0 inline-block text-center transition-transform duration-500 w-[30vw] max-w-[500px] mx-4"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-[70%] h-auto object-cover rounded-full mx-auto mb-4"
        />
        <p className="text-white font-semibold text-xl">{member.name}</p>
        <p className="text-gray-400 text-base mt-1">{member.role}</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default Team;

