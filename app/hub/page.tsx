import TopBar from '@/components/hub/topBar';
import CrudCompanyModal from '@/redux/features/crudCompany/crudCompanyModal';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

type Props = {};

function page({}: Props) {
  return (
    <>
      <div className="h-full">
        <TopBar />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <CrudCompanyModal />
        </div>
      </div>
    </>
  );
}

export default page;
