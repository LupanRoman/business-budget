"use client";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  handleIncomesForm,
  handleTypesList,
  incomesFormStateValue,
  showTypesListValue,
} from "./incomesSlice";

type Props = {};

function AddIncome({}: Props) {
  const dispatch = useAppDispatch();
  const incomesFormState = useAppSelector(incomesFormStateValue);
  const typesListState = useAppSelector(showTypesListValue);
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
        <div className="flex h-full flex-col justify-between gap-3 px-5 py-10">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="w-fit border-b-2 bg-transparent text-sm font-medium outline-none"
            />
            <input
              type="number"
              placeholder="0"
              inputMode="numeric"
              min="0"
              className="inputAmount w-fit border-b-2 bg-transparent text-sm font-medium outline-none"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-4 text-sm">
                <p className="h-fit rounded-lg">Type</p>
                <div
                  onClick={() => {
                    dispatch(handleTypesList(!typesListState));
                  }}
                  className="relative"
                >
                  <button className="bg-tertiaryColor rounded-lg py-1 pl-2 pr-10 text-sm">
                    None
                  </button>
                  {typesListState ? (
                    <>
                      <ul className="bg-tertiaryColor absolute left-0 right-0 top-8 flex flex-col gap-1 rounded-lg px-2 py-1">
                        <li>Sales</li>
                        <li>Dividends</li>
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-4 text-xs font-semibold">
            <button className="rounded-lg bg-brandColor px-5 py-1">Add</button>
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
