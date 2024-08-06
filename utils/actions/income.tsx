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
  // TODO Change the way the total income is calculated
  // TODO for a larger database it may be inefficient
  let totalIncome = 0;
  for (let i = 0; i < Incomes!.length; i++) {
    totalIncome! += Incomes![i].amount;
  }
  return totalIncome;
};

export const deleteIncomeEntry = async (id: number) => {
  "user server";
  const { error } = await supabase.from("Incomes").delete().eq("id", id);
};

export const editIncomeEntry = async (
  id: number,
  incomeTitle: string,
  incomeType: string,
  incomeAmount: number,
) => {
  const { data, error } = await supabase
    .from("Incomes")
    .update({ title: incomeTitle, type: incomeType, amount: incomeAmount })
    .eq("id", id)
    .select();
};
