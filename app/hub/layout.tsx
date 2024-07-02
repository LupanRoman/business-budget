import ReduxProvider from '@/redux/redux-provider';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/signIn');
  }

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
