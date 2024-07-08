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
      <div>
        {companiesList.map((company: any) => {
          return (
            <>
              <div>
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
