"use client";
import {
  handleActions,
  handleIncomesForm,
  incomesFormStateValue,
  showActionsValue,
} from "@/redux/features/incomes/incomesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

type Props = {};

function AddBtn({}: Props) {
  const dispatch = useAppDispatch();
  const showActionsState = useAppSelector(showActionsValue);
  const incomesFormState = useAppSelector(incomesFormStateValue);
  return (
    <>
      <div className="hidden w-full px-2 md:flex">
        <div
          onClick={() => {
            dispatch(handleActions(!showActionsState));
          }}
          className="relative w-full cursor-pointer rounded-xl bg-brandColor py-2"
        >
          <p className="w-full items-center text-center text-sm font-semibold">
            Add
          </p>
          {showActionsState ? (
            <div className="absolute bottom-10 flex w-full flex-col items-start justify-start gap-2 rounded-lg bg-secondaryColor px-2 py-2 text-xs font-medium text-black">
              <button
                onClick={() => {
                  dispatch(handleIncomesForm(!incomesFormState));
                }}
                className="w-full rounded-lg px-2 py-1 text-start hover:bg-brandColor"
              >
                Income
              </button>
              <button className="w-full rounded-lg px-2 py-1 text-start hover:bg-brandColor">
                Expense
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AddBtn;
