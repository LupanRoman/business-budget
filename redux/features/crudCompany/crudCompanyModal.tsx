'use client';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React from 'react';
import { handleModal, isModalOpenValue } from './crudCompanySlice';

type Props = {};

function CrudCompanyModal({}: Props) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isModalOpenValue);
  return isModalOpen ? (
    <>
      <div className="flex flex-col gap-5 bg-accentColor text-white px-10 rounded-lg">
        <h2 className="text-lg font-bold">Add your company</h2>
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="How is your company called ?" />
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold bg-brandColor px-3 py-2 rounded-lg">
              Add
            </button>
            <button
              className="text-sm font-semibold opacity-50"
              onClick={() => {
                dispatch(handleModal(!isModalOpen));
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default CrudCompanyModal;
