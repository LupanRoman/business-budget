'use client';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import CompanyCard from './companyCard';

type Props = {
  serverCompanies: any;
};

function CompaniesList({ serverCompanies }: Props) {
  const [companiesList, setCompaniesList] = useState(serverCompanies);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Company' },
        async () => {
          const { data: Companies } = await supabase
            .from('Company')
            .select('*');
          setCompaniesList(Companies);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverCompanies]);

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10 w-full gap-5 md:flex-row md:justify-normal px-10 flex-wrap">
        {companiesList.map((company: any) => {
          return (
            <>
              <div className="flex items-center">
                <CompanyCard title={company.company_title} id={company.id} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CompaniesList;
