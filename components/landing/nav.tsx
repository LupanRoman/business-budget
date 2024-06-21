import Link from 'next/link';
import React from 'react';

type Props = {};

function Nav({}: Props) {
  return (
    <>
      <div className="bg-accentColor text-white flex items-center h-[10svh] justify-between px-10 rounded-b-3xl">
        <h1 className="font-bold text-xl">Business-Budget</h1>
        <div className="flex items-center gap-4">
          <Link href={'/auth/signUp'}>
            <button className="bg-brandColor px-3 py-2 rounded-lg font-semibold text-sm">
              Start tracking
            </button>
          </Link>
          <Link href={'/auth/signIn'}>
            <button className="text-sm font-semibold opacity-50">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
