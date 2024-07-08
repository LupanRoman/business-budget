import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  id: string;
};

function CompanyCard({ title, id }: Props) {
  return (
    <>
      <div>
        <Link href={`workspace/${id}/dashboard`}>
          <h2>{title}</h2>
        </Link>
      </div>
    </>
  );
}

export default CompanyCard;
