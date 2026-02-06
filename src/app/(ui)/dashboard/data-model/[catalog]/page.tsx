import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/dashboard/data-model");
};

export default page;
