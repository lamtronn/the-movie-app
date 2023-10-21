"use client";

import Homepage from "@/app/(navbar)/home/Homepage";
import ReduxProvider from "@/app/store/ReduxProvider";

export default function HomepageWrapper() {
  return (
    <ReduxProvider>
      <Homepage />
    </ReduxProvider>
  );
}
