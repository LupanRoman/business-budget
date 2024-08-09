import BalanceCard from "@/components/workspace/dashboard/balanceCard";
import ExpensesCard from "@/components/workspace/dashboard/expensesCard";
import IncomesCard from "@/components/workspace/dashboard/incomesCard";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();

  let { data: Company, error } = await supabase
    .from("Company")
    .select("*")
    .eq("id", id);

  let { data: Incomes, error: IncomesError } = await supabase
    .from("Incomes")
    .select("*")
    .eq("company_id", id);

  let { data: Expenses, error: ExpensesError } = await supabase
    .from("Expenses")
    .select("*")
    .eq("company_id", id);

  // const budget = Company![0].incomes - Company![0].expenses;

  return (
    <>
      <div className="w-full gap-2">
        <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
          <BalanceCard
            incomes={Company![0].incomes}
            expenses={Company![0].expenses}
            serverCompany={Company}
            companyID={id}
          />
          <IncomesCard
            serverIncomes={Incomes}
            incomes={Company![0].incomes}
            id={id}
            serverCompany={Company}
          />
          <ExpensesCard
            serverCompany={Company}
            serverExpenses={Expenses}
            expenses={Company![0].expenses}
            id={id}
          />
        </div>
      </div>
    </>
  );
}

export default page;
