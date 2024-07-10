import React from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

type Props = {
  expenses: number;
  budget: number;
  id: number;
};

function ExpensesCard({ expenses, budget, id }: Props) {
  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2 className="text-sm font-semibold">Expenses</h2>
          </div>
          <h3 className="text-2xl font-bold">{expenses}</h3>
        </div>
        <div className="flex w-full items-center justify-end gap-2 text-xs text-green-600">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div>
      </div>
    </>
  );
}

export default ExpensesCard;
