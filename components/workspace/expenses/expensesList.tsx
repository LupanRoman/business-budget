"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteIncomeEntry } from "@/utils/actions/income";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

type Props = {
  serverExpenses: any;
  companyID: number;
};

function ExpensesList({ serverExpenses, companyID }: Props) {
  const [expensesList, setExpensesList] = useState(serverExpenses);
  const [isEntryEditable, setIsEntryEditable] = useState(false);

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
            .eq("company_id", companyID);
          setExpensesList(Expenses);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverExpenses]);
  return (
    <>
      <div className="flex w-1/2 flex-col gap-2">
        {expensesList.map((expense: any) => {
          return (
            <>
              <div className="flex w-full items-center justify-between gap-5 rounded-lg bg-secondaryColor px-5 py-2">
                {isEntryEditable ? (
                  <input />
                ) : (
                  <h2 className="text-sm font-medium">{expense.title}</h2>
                )}
                <div className="flex items-center gap-3 text-sm font-medium">
                  <p className="text-xs">{expense.type}</p>
                  <p>{expense.amount}</p>
                  <div className="flex items-center gap-1">
                    <button
                      //   onClick={() => {
                      //     console.log(income.id);
                      //     if (income.id) {
                      //       setIsEntryEditable(!isEntryEditable);
                      //     }
                      //   }}
                      className="opacity-50"
                    >
                      <EditRoundedIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => {
                        deleteIncomeEntry(expense.id);
                      }}
                      className="opacity-50"
                    >
                      <DeleteRoundedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ExpensesList;
