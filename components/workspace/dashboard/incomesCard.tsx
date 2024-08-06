"use client";
import React, { useEffect, useState } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { createClient } from "@/utils/supabase/client";
import { getIncomes } from "@/utils/actions/income";

type Props = {
  incomes: number;
  budget: number;
  id: number;
  serverCompany: any;
  serverIncomes: any;
};

function IncomesCard({
  serverIncomes,
  incomes,
  budget,
  id,
  serverCompany,
}: Props) {
  const [companyIncome, setCompanyIncome] = useState(serverCompany);
  const [totalIncome, setTotalIncome] = useState<number>();
  const [incomesList, setIncomesList] = useState(serverIncomes);

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
            .select("incomes")
            .eq("id", id);
          setCompanyIncome(Company);
          console.log(Company![0].incomes);
          console.log(companyIncome);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverCompany]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Incomes" },
        async () => {
          const { data: Incomes } = await supabase
            .from("Incomes")
            .select("*")
            .eq("company_id", id);
          setIncomesList(Incomes);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverIncomes]);

  useEffect(() => {
    const getTotalIncome = async () => {
      let result = await getIncomes(id.toString());
      setTotalIncome(result);
    };
    getTotalIncome();
  }, [incomesList]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2 className="text-sm font-semibold">Incomes</h2>
          </div>
          <h3 className="text-2xl font-bold">{totalIncome}</h3>
        </div>
        {/* <div className="flex w-full items-center justify-end gap-2 text-xs text-green-600">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div> */}
      </div>
    </>
  );
}

export default IncomesCard;
