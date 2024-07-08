'use client';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useState } from 'react';
import { handleModal, isModalOpenValue } from './crudCompanySlice';
import { createClient } from '@/utils/supabase/client';

type Props = {};

function CrudCompanyModal({}: Props) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isModalOpenValue);
  const [companyTitle, setCompanyTitle] = useState<string>();

  const addCompany = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('Company')
      .insert([{ company_title: companyTitle }])
      .select();
  };

  return isModalOpen ? (
    <>
      <div className="flex flex-col gap-3 bg-accentColor text-white px-10 py-5 rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-lg font-bold">Add your company</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="How is your company called ?"
            className="bg-transparent text-white font-semibold border-b-2 outline-none"
            onChange={(e) => {
              setCompanyTitle(e.target.value);
            }}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                addCompany();
                dispatch(handleModal(!isModalOpen));
              }}
              className="text-sm font-semibold bg-brandColor px-3 py-2 rounded-lg"
            >
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
