"use client";
import React, { useEffect } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { createClient } from "@/utils/supabase/client";

type Props = {
  incomes: number;
  budget: number;
  id: number;
};

function IncomesCard({ incomes, budget, id }: Props) {
  useEffect(() => {
    const updateBudget = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("Company")
        .update({ budget: budget })
        .eq("id", id)
        .select();
    };
    updateBudget();
  }, [incomes]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2 className="text-sm font-semibold">Incomes</h2>
          </div>
          <h3 className="text-2xl font-bold">{incomes}</h3>
        </div>
        <div className="flex w-full items-center justify-end gap-2 text-xs text-green-600">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div>
      </div>
    </>
  );
}

export default IncomesCard;
