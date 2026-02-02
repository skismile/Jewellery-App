"use client";

import React from "react";
import { Button } from "@/components/ui/button";
// or any context / hook-based imports

export default function GlobalError({ error, reset }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
