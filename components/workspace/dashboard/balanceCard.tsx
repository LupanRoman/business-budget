import React from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

type Props = {};

function BalanceCard({}: Props) {
  return (
    <>
      <div className="bg-secondaryColor flex flex-col gap-5 w-fit py-5 px-5 rounded-xl">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2 className="font-semibold text-sm">Your balance</h2>
            <AccountBalanceRoundedIcon fontSize="small" />
          </div>
          <h3 className="text-2xl font-bold">10,000 lei</h3>
        </div>
        <div className="flex items-center gap-2 w-full text-green-600 text-xs justify-end">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div>
      </div>
    </>
  );
}

export default BalanceCard;
