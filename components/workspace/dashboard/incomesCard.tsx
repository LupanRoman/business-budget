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
};

function IncomesCard({ incomes, budget, id, serverCompany }: Props) {
  const [companyIncome, setCompanyIncome] = useState(serverCompany);
  const [totalIncome, setTotalIncome] = useState<number>();

  // useEffect(() => {
  //   const updateBudget = async () => {
  //     const supabase = createClient();
  //     const { data, error } = await supabase
  //       .from("Company")
  //       .update({ budget: budget })
  //       .eq("id", id)
  //       .select();
  //   };
  //   updateBudget();
  // }, [incomes]);

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

  let incomesList: any = getIncomes(id.toString());

  useEffect(() => {
    const testFunction = async () => {
      let result = await getIncomes(id.toString());
      console.log(result);
      result?.map((income: any) => {
        for (let i = 0; i == result.length; i++) {
          setTotalIncome(income++);
        }
      });
    };
    testFunction();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2
              onClick={() => {
                console.log(totalIncome);
              }}
              className="text-sm font-semibold"
            >
              Incomes
            </h2>
          </div>
          <h3 className="text-2xl font-bold">{totalIncome}</h3>
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
