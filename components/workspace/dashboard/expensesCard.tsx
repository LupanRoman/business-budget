"use client";
import React, { useEffect, useState } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { createClient } from "@/utils/supabase/client";
import { getExpenses } from "@/utils/actions/expenses";

type Props = {
  expenses: number;
  id: number;
  serverCompany: any;
  serverExpenses: any;
};

function ExpensesCard({ expenses, id, serverCompany, serverExpenses }: Props) {
  const [companyExpenses, setCompanyExpenses] = useState(serverCompany);
  const [totalExpenses, setTotalExpenses] = useState<number>();
  const [expensesList, setExpensesList] = useState(serverExpenses);

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
            .select("expenses")
            .eq("id", id);
          setCompanyExpenses(Company);
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
        { event: "*", schema: "public", table: "Expenses" },
        async () => {
          const { data: Expenses } = await supabase
            .from("Expenses")
            .select("*")
            .eq("company_id", id);
          setExpensesList(Expenses);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverExpenses]);

  useEffect(() => {
    const getTotalIncome = async () => {
      let result = await getExpenses(id.toString());
      setTotalExpenses(result);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("Company")
        .update({ incomes: result })
        .eq("id", id)
        .select();
    };
    getTotalIncome();
  }, [expensesList]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-secondaryColor px-5 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-32">
            <h2 className="text-sm font-semibold">Expenses</h2>
          </div>
          <h3 className="text-2xl font-bold">{totalExpenses}</h3>
        </div>
        {/* <div className="flex w-full items-center justify-end gap-2 text-xs text-green-600">
          <TrendingUpRoundedIcon fontSize="small" />
          <p>2.30%</p>
        </div> */}
      </div>
    </>
  );
}

export default ExpensesCard;
