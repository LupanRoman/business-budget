'use client';
import React from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  handleModal,
  isModalOpenValue,
} from '@/redux/features/crudCompany/crudCompanySlice';

type Props = {};

function TopBar({}: Props) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isModalOpenValue);
  return (
    <>
      <div className="flex items-center justify-between px-10 bg-accentColor rounded-b-3xl h-[10svh] text-white">
        <h1 className="font-bold text-lg">Business Budget</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              dispatch(handleModal(!isModalOpen));
            }}
            className="text-sm font-semibold px-3 py-2 rounded-lg bg-brandColor"
          >
            Add new company
          </button>
          <button className="opacity-50">
            <LogoutRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TopBar;
