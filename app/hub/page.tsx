import TopBar from '@/components/hub/topBar';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

type Props = {};

function page({}: Props) {
  // const signOut = async () => {
  //   'use server';
  //   const supabase = createClient();
  //   const { error } = await supabase.auth.signOut();
  // };
  return (
    <>
      {/* <form action={signOut}>
        <button>Out</button>
      </form> */}
      <div>
        <TopBar />
      </div>
    </>
  );
}

export default page;
