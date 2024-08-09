"use server";
import { createClient } from "../supabase/server";

const supabase = createClient();

export const addExpense = async (
  expenseTitle: string,
  expenseAmount: string,
  expenseType: string,
  companyID: string,
) => {
  const { data, error } = await supabase
    .from("Expenses")
    .insert([
      {
        title: expenseTitle,
        amount: expenseAmount,
        type: expenseType,
        company_id: companyID,
      },
    ])
    .select();
};

export const getExpenses = async (companyID: string) => {
  "use server";
  let { data: Expenses, error } = await supabase
    .from("Expenses")
    .select("amount")
    .eq("company_id", companyID);
  // TODO Change the way the total income is calculated
  // TODO for a larger database it may be inefficient
  let totalExpenses = 0;
  for (let i = 0; i < Expenses!.length; i++) {
    totalExpenses! += Expenses![i].amount;
  }
  return totalExpenses;
};
