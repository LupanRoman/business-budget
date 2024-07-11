import Nav from "@/components/landing/nav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

async function page({}: Props) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/hub");
  }

  return (
    <>
      <div>
        <Nav />
      </div>
    </>
  );
}

export default page;
