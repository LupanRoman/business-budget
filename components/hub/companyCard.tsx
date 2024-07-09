import Link from 'next/link';
import React from 'react';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

type Props = {
  title: string;
  id: string;
};

function CompanyCard({ title, id }: Props) {
  const setToLocal = () => {
    localStorage.setItem('projectID', JSON.stringify(id));
  };

  return (
    <>
      <Link
        href={`workspace/${id}/dashboard`}
        onClick={() => {
          setToLocal();
        }}
      >
        <div className="bg-accentColor/30 relative h-[180px] w-[330px] rounded-[10px] px-5 py-2 flex text-white justify-between ">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p>
            <BusinessCenterRoundedIcon fontSize="small" />
          </p>
        </div>
      </Link>
    </>
  );
}

export default CompanyCard;
