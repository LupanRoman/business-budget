"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import AddBtn from "./addBtn";

type Props = {};

function SideBar({}: Props) {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [currentProjectID, setCurrentProjectID] = useState(Number);

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-center bg-accentColor py-5 text-white lg:h-full lg:max-w-[200px] lg:flex-col lg:justify-normal lg:gap-5 lg:rounded-r-3xl lg:px-3 lg:py-0">
        <div className="flex w-full items-center justify-around lg:h-full lg:max-w-[200px] lg:flex-col lg:items-start lg:justify-normal lg:gap-5 lg:px-2 lg:py-0 lg:pt-20">
          <Link
            onClick={() => {
              setActiveLink("Dashboard");
            }}
            href={`/workspace/${currentProjectID}/dashboard`}
            className={`${
              activeLink == "Dashboard" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium lg:flex">
              <SpaceDashboardRoundedIcon fontSize="small" />
              <p className="hidden lg:flex">Dashboard</p>
            </button>
          </Link>
          <Link
            href={`/workspace/${currentProjectID}/incomes`}
            onClick={() => {
              setActiveLink("Incomes");
            }}
            className={`${
              activeLink == "Incomes" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium lg:flex">
              <AddCardRoundedIcon fontSize="small" />
              <p className="hidden lg:flex">Incomes</p>
            </button>
          </Link>
          <Link
            href={`/workspace/${currentProjectID}/expenses`}
            onClick={() => {
              setActiveLink("Expenses");
            }}
            className={`${
              activeLink == "Expenses" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium lg:flex">
              <PaymentRoundedIcon fontSize="small" />
              <p className="hidden lg:flex">Expenses</p>
            </button>
          </Link>
          <Link
            href={`/workspace/${currentProjectID}/analytics`}
            onClick={() => {
              setActiveLink("Analytics");
            }}
            className={`${
              activeLink == "Analytics" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium lg:flex">
              <DonutLargeRoundedIcon fontSize="small" />
              <p className="hidden lg:flex">Analytics</p>
            </button>
          </Link>
        </div>
        <div className="hidden md:flex pb-20 w-full">
          <AddBtn />
        </div>
      </div>
    </>
  );
}

export default SideBar;
