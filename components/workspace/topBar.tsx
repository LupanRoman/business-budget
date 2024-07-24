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
import { createClient } from "@/utils/supabase/client";

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

  const [currentProjectID, setCurrentProjectID] = useState<string>();
  const [currentCompanyName, setCurrentCompanyName] = useState<string>();

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
    const getName = async () => {
      const supabase = createClient();
      let { data: Company, error } = await supabase
        .from("Company")
        .select("company_title")
        .eq("id", projectID);
      setCurrentCompanyName(Company![0].company_title);
    };
    getName();
  }, []);

  return (
    <>
      <div className="flex h-[10svh] w-full items-center justify-end px-4 md:px-8 lg:h-full lg:justify-between">
        <div className="hidden flex-col text-xs font-medium lg:flex">
          <div className="flex items-center gap-2">
            <h2>{greeting}</h2>
            <p className="text-lg">{user.user_metadata.full_name}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{currentCompanyName}</h2>
          </div>
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
