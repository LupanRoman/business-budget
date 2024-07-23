"use server";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export const deleteCompany = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("Company").delete().eq("id", id);
  console.log(error);
  redirect("/hub");
};
