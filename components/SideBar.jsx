"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState } from "react";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Remover", src: "Chart_fill" },
    { title: "Splitter", src: "Chat" },
    { title: "Pitcher", src: "User" },
    { title: "Key BPM Finder ", src: "Calendar" },
    { title: "Cutter", src: "Search" },
    { title: "Joiner", src: "Chart" },
    { title: "Recorder ", src: "Folder" },
    { title: "Karaoke", src: "Setting" },
    { title: "Support", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-20" : "w-0 bg-transparent"
        } bg-purple-600 h-screen p-4  pt-8 fixed duration-300 text-center text-sm font-semibold overflow-y-auto`}
      >
        <RxHamburgerMenu
          onClick={() => setOpen(!open)}
          className=" cursor-pointer text-2xl mx-auto"
        />

        <div className="flex gap-x-4 items-center"></div>
        <ul className="pt-6">
          {Menus.map((MenuItem, index) => (
            <li
              key={index}
              className={`flex flex-col  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                 ${index === 0 && "bg-light-white"} `}
            >
              <img src={`/assets/${MenuItem.src}.png`} />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 mt-2 text-xs`}
              >
                {MenuItem.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
