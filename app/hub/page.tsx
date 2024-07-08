import CompaniesList from '@/components/hub/companiesList';
import TopBar from '@/components/hub/topBar';
import CrudCompanyModal from '@/redux/features/crudCompany/crudCompanyModal';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

type Props = {};

async function page({}: Props) {
  const supabase = createClient();
  let { data: Companies, error } = await supabase.from('Company').select('*');
  console.log(Companies);

  return (
    <>
      <div className="h-full">
        <TopBar />
        <CrudCompanyModal />
        <CompaniesList serverCompanies={Companies} />
      </div>
    </>
  );
}

export default page;
