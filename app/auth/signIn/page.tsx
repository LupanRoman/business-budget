import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import googleIcon from '@/public/googleIcon.png';

type Props = {};

function page({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server';
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/auth/signIn?message=Could not authenticate user');
    }

    return redirect(`${origin}/hub`);
  };

  const signInWithGoogle = async () => {
    'use server';
    const origin = headers().get('origin');
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    redirect(data.url || '');
  };

  return (
    <>
      <div className="flex h-[100svh] flex-col items-center justify-center bg-accentColor drop-shadow-2xl md:w-2/5 md:rounded-r-2xl">
        <form action={signInWithGoogle}>
          <button className="flex items-center gap-6 rounded-lg bg-[#5C5C5C] drop-shadow-lg px-[32px] py-[16px] text-xl font-semibold text-white">
            <Image
              alt="log of google"
              width={30}
              height={30}
              src={googleIcon}
            />
            Continue with Google
          </button>
        </form>
        <p className="text-white pb-[40px] pt-[20px] font-semibold">or</p>
        <form
          autoComplete="off"
          action={signIn}
          className="flex flex-col gap-3"
        >
          <input
            className="active:bg-mainBG rounded-lg text-black bg-white py-[12px] indent-2 text-base font-semibold outline-none drop-shadow-lg"
            type="email"
            placeholder="Email address"
            name="email"
            required
          />
          <input
            className="active:bg-mainBG rounded-lg text-black bg-white py-[12px] indent-2 text-base font-semibold outline-none drop-shadow-lg"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <div className="controls flex flex-col gap-2 pt-[100px]">
            <button
              formAction={signIn}
              className="text-white rounded-lg bg-brandColor py-[10px] text-xl font-semibold"
            >
              Sign in
            </button>
            <Link href={'/auth/signUp'}>
              <button className="text-white text-base">
                Don't have an account yet?
                <span className="font-semibold"> Sign up</span>
              </button>
            </Link>
          </div>
          {searchParams?.message && (
            <p className="mt-4 bg-3BG/20 p-4 text-center text-white/50">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default page;
