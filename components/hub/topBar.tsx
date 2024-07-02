import React from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

type Props = {};

function TopBar({}: Props) {
  return (
    <>
      <div className="flex items-center justify-between px-10 bg-accentColor rounded-b-3xl h-[10svh] text-white">
        <h1 className="font-bold text-lg">Business Budget</h1>
        <div className="flex items-center gap-5">
          <button className="text-sm font-semibold px-3 py-2 rounded-lg bg-brandColor">
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
