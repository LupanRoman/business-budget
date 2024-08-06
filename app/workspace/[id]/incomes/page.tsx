import IncomesList from "@/components/workspace/incomes/incomesList";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  let { data: Incomes, error } = await supabase
    .from("Incomes")
    .select("*")
    .eq("company_id", id);

    

  return (
    <>
      <div>
        <IncomesList serverIncomes={Incomes} companyID={id} />
      </div>
    </>
  );
}

export default page;
