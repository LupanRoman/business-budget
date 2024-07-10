import Link from "next/link";
import React from "react";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

type Props = {
  title: string;
  id: string;
};

function CompanyCard({ title, id }: Props) {
  const setToLocal = () => {
    localStorage.setItem("projectID", JSON.stringify(id));
  };

  return (
    <>
      <Link
        href={`workspace/${id}/dashboard`}
        onClick={() => {
          setToLocal();
        }}
      >
        <div className="relative flex h-[180px] w-[330px] justify-between rounded-[10px] bg-accentColor/30 px-5 py-2 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>
            <BusinessCenterRoundedIcon fontSize="small" />
          </p>
        </div>
      </Link>
    </>
  );
}

export default CompanyCard;
