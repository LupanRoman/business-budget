import React from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

type Props = {
  budget: number;
};

function BalanceCard({ budget }: Props) {
  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Your balance</h2>
            <AccountBalanceRoundedIcon fontSize="small" />
          </div>
          <h3 className="text-2xl font-bold">{budget}</h3>
        </div>
        <div className="flex w-full items-center justify-end gap-2 text-xs text-green-600">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div>
      </div>
    </>
  );
}

export default BalanceCard;