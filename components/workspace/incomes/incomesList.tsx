"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteIncomeEntry } from "@/utils/actions/income";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

type Props = {
  serverIncomes: any;
  companyID: number;
};

function IncomesList({ serverIncomes, companyID }: Props) {
  const [incomesList, setIncomesList] = useState(serverIncomes);
  const [isEntryEditable, setIsEntryEditable] = useState(false);

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
            .eq("company_id", companyID);
          setIncomesList(Incomes);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverIncomes]);

  return (
    <>
      <div className="flex w-1/2 flex-col gap-2">
        {incomesList.map((income: any) => {
          return (
            <>
              <div className="flex w-full items-center justify-between gap-5 rounded-lg bg-secondaryColor px-5 py-2">
                {isEntryEditable ? (
                  <input />
                ) : (
                  <h2 className="text-sm font-medium">{income.title}</h2>
                )}
                <div className="flex items-center gap-3 text-sm font-medium">
                  <p className="text-xs">{income.type}</p>
                  <p>{income.amount}</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        // if (income.id == e) {
                        //   setIsEntryEditable(!isEntryEditable);
                        // } else {
                        //   return;
                        // }
                        console.log(income.id);
                        if (income.id) {
                          setIsEntryEditable(!isEntryEditable);
                        }
                      }}
                      className="opacity-50"
                    >
                      <EditRoundedIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => {
                        deleteIncomeEntry(income.id);
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

export default IncomesList;
