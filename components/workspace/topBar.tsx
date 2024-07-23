"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {
  handleSettings,
  handleSettingsValue,
} from "@/redux/features/crudCompany/crudCompanySlice";

type Props = {
  user: User;
};

function TopBar({ user }: Props) {
  const dispatch = useAppDispatch();
  const handleSettingsState = useAppSelector(handleSettingsValue);

  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours <= 10 && hours >= 6) {
      setGreeting("Good morning");
    } else if (hours >= 10 && hours <= 17) {
      setGreeting("Good day");
    } else if (hours >= 17) {
      setGreeting("Good afternoon");
    }
  }, []);

  //   const [currentProjectID, setCurrentProjectID] = useState(Number);
  //   useEffect(() => {
  //     const projectID = JSON.parse(localStorage.getItem('projectID') || '');
  //     setCurrentProjectID(projectID);
  //     console.log(user);
  //   }, []);

  return (
    <>
      <div className="flex h-[10svh] w-full items-center justify-end px-4 md:px-8 lg:h-full lg:justify-between">
        <div className="hidden flex-col text-sm font-medium lg:flex">
          <h2>{greeting}</h2>
          <p className="text-lg">{user.user_metadata.full_name}</p>
        </div>
        <div className="relative flex items-center justify-center gap-5">
          {user.user_metadata.picture ? (
            <button className="relative">
              <Image
                src={user.user_metadata.picture}
                width={30}
                height={30}
                alt="user profile picture"
                className="rounded-full"
              />
            </button>
          ) : null}
          <button
            onClick={() => {
              dispatch(handleSettings(!handleSettingsState));
            }}
          >
            <SettingsRoundedIcon fontSize="small" />
          </button>
          <Link href={"/hub"}>
            <button>
              <LogoutRoundedIcon fontSize="small" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopBar;
