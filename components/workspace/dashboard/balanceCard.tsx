"use client";
import React, { useEffect, useState } from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { createClient } from "@/utils/supabase/client";

type Props = {
  incomes: number;
  expenses: number;
  serverCompany: any;
  companyID: number;
};

function BalanceCard({ incomes, expenses, serverCompany, companyID }: Props) {
  const [budget, setBudget] = useState<number>();
  const [companyUpdates, setCompanyUpdates] = useState(serverCompany);
  
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Company" },
        async () => {
          const { data: Company } = await supabase
            .from("Company")
            .select("*")
            .eq("id", companyID);
          setCompanyUpdates(Company);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverCompany]);

  useEffect(() => {
    setBudget(incomes - expenses);
  }, [serverCompany]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2
              className="text-sm font-semibold"
              onClick={() => {
                console.log(budget);
              }}
            >
              Your balance
            </h2>
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
