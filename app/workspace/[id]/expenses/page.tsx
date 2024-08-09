import ExpensesList from "@/components/workspace/expenses/expensesList";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  let { data: Expenses, error } = await supabase
    .from("Expenses")
    .select("*")
    .eq("company_id", id);
  return (
    <div>
      <ExpensesList serverExpenses={Expenses} companyID={id} />
    </div>
  );
}

export default page;
