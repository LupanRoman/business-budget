"use client";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { incomesFormStateValue } from "./incomesSlice";

type Props = {};

function AddIncome({}: Props) {
  const dispatch = useAppDispatch();
  const incomesFormState = useAppSelector(incomesFormStateValue);
  return incomesFormState ? (
    <>
      <div className="absolute bottom-0 right-0 z-40 flex h-[80svh] w-full flex-col rounded-tr-2xl bg-secondaryColor md:w-1/3">
        <div className="flex items-center justify-between px-5 py-5">
          <h4>Add income</h4>
          <CloseRoundedIcon fontSize="small" />
        </div>
        <div className="flex h-full flex-col justify-between gap-3 px-5 py-10">
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Title" className="w-fit" />
            <input type="number" placeholder="0" className="w-fit" />
          </div>
          <div className="flex w-full items-center justify-end gap-4 text-xs font-semibold">
            <button className="rounded-lg bg-brandColor px-5 py-1">Add</button>
            <button className="text-black/50">Dismiss</button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default AddIncome;
