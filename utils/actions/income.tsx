"use server";
import { createClient } from "../supabase/server";

const supabase = createClient();

export const addIncome = async (
  incomeTitle: string,
  incomeAmount: string,
  incomeType: string,
  companyID: string,
) => {
  const { data, error } = await supabase
    .from("Incomes")
    .insert([
      {
        title: incomeTitle,
        amount: incomeAmount,
        type: incomeType,
        company_id: companyID,
      },
    ])
    .select();
};

export const getIncomes = async (companyID: string) => {
  "use server";
  let { data: Incomes, error } = await supabase
    .from("Incomes")
    .select("amount")
    .eq("company_id", companyID);

  let totalIncome = 0;
  for (let i = 0; i < Incomes!.length; i++) {
    totalIncome! += Incomes![i].amount;
  }
  return totalIncome;
};
