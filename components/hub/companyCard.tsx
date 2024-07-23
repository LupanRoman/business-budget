import Link from "next/link";
import React from "react";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { createClient } from "@/utils/supabase/client";

type Props = {
  title: string;
  id: string;
};

function CompanyCard({ title, id }: Props) {
  const setToLocal = () => {
    localStorage.setItem("projectID", JSON.stringify(id));
  };

  const deleteCompany = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("Company").delete().eq("id", id);
  };

  return (
    <>
      <Link
        href={`workspace/${id}/dashboard`}
        onClick={() => {
          setToLocal();
        }}
      >
        <div className="relative flex h-[180px] w-[330px] flex-col justify-between rounded-[10px] bg-accentColor/30 px-5 py-2 text-white">
          <div className="flex w-full justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p>
              <BusinessCenterRoundedIcon fontSize="small" />
            </p>
          </div>
          {/* <div className="flex w-full justify-end">
            <button
              onClick={() => {
                deleteCompany();
              }}
            >
              <DeleteRoundedIcon />
            </button>
          </div> */}
        </div>
      </Link>
    </>
  );
}

export default CompanyCard;
