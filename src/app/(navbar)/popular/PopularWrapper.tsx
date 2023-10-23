"use client";

import ReduxProvider from "@/app/store/ReduxProvider";
import Popular from "@/app/(navbar)/popular/Popular";

export default function PopularWrapper() {
  return (
    <ReduxProvider>
      <Popular />
    </ReduxProvider>
  );
}
