"use client";
import React, { useEffect, useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useAppSelector } from "@/redux/store";
import { handleSettingsValue } from "./crudCompanySlice";
import { deleteCompany } from "@/utils/actions/company";

type Props = {};

function Settings({}: Props) {
  const handleSettingsState = useAppSelector(handleSettingsValue);
  const [currentCompanyId, setCurrentCompanyId] = useState<string>("");

  useEffect(() => {
    const currentId = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentCompanyId(currentId);
  }, []);

  return handleSettingsState ? (
    <>
      <div className="absolute right-20 top-14 rounded-md bg-[#DCDBDB] px-5 py-5">
        <div className="flex">
          <button
            onClick={() => {

              deleteCompany(currentCompanyId);
            }}
            className="flex items-center gap-2 text-xs font-medium"
          >
            <DeleteRoundedIcon fontSize="small" />
            <h2>Remove company</h2>
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default Settings;
