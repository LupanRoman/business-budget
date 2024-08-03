"use client";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  handleIncomesForm,
  handleTypesList,
  incomesFormStateValue,
  showTypesListValue,
} from "./incomesSlice";
import { addIncome, getIncomes } from "@/utils/actions/income";
import IncomesType from "@/lib/IncomesType";

type Props = {};

function AddIncome({}: Props) {
  const dispatch = useAppDispatch();
  const incomesFormState = useAppSelector(incomesFormStateValue);
  const typesListState = useAppSelector(showTypesListValue);

  const [incomeTitle, setIncomeTitle] = useState<string>();
  const [incomeAmount, setIncomeAmount] = useState<string>();
  const [incomeType, setIncomeType] = useState<string>("");
  const [companyID, setCompanyID] = useState<string>();

  useEffect(() => {
    setCompanyID(JSON.parse(localStorage.getItem("projectID") || ""));
  }, []);

  return incomesFormState ? (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-30 bg-black/40"
        onClick={() => {
          dispatch(handleIncomesForm(!incomesFormState));
        }}
      ></div>
      <div className="absolute bottom-0 right-0 z-40 flex h-[80svh] w-full flex-col rounded-tl-2xl bg-secondaryColor md:w-1/3">
        <div className="flex items-center justify-between px-5 py-5">
          <h4 className="text-sm font-medium">Add income</h4>
          <p
            className="cursor-pointer"
            onClick={() => {
              dispatch(handleIncomesForm(!incomesFormState));
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </p>
        </div>
        <div className="flex h-full flex-col justify-between gap-3 px-5 py-5">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="w-fit border-b-2 bg-transparent text-sm font-medium outline-none"
              onChange={(e) => {
                setIncomeTitle(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="0"
              inputMode="numeric"
              min="0"
              className="inputAmount w-fit border-b-2 bg-transparent text-sm font-medium outline-none"
              onChange={(e) => {
                setIncomeAmount(e.target.value);
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-4 text-sm">
                <p className="h-fit rounded-lg">Type:</p>
                <div
                  onClick={() => {
                    dispatch(handleTypesList(!typesListState));
                  }}
                  className="relative"
                >
                  <button className="rounded-lg bg-tertiaryColor py-1 pl-2 pr-20 text-xs">
                    {incomeType == "" ? "None" : incomeType}
                  </button>
                  <div className="absolute -right-5 left-0 pt-2">
                    {typesListState ? (
                      <>
                        <div className="no-scrollbar flex h-[300px] flex-col items-start overflow-y-scroll rounded-xl bg-tertiaryColor px-1 py-2 text-xs font-medium">
                          {IncomesType.map((income: string) => {
                            return (
                              <>
                                <div className="w-full">
                                  <button
                                    onClick={() => {
                                      setIncomeType(income);
                                    }}
                                    className="w-full rounded-lg px-2 py-1 text-start hover:bg-brandColor"
                                  >
                                    {income}
                                  </button>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-4 text-xs font-semibold">
            <button
              onClick={() => {
                addIncome(
                  incomeTitle || "",
                  incomeAmount || "",
                  incomeType || "",
                  companyID || "",
                );
                dispatch(handleIncomesForm(!incomesFormState));
              }}
              className="rounded-lg bg-brandColor px-5 py-1"
            >
              Add
            </button>
            <button
              onClick={() => {
                dispatch(handleIncomesForm(!incomesFormState));
              }}
              className="text-black/50"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default AddIncome;
