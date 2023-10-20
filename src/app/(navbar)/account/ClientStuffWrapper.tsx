"use client";

import ClientStuff from "@/app/(navbar)/account/ClientStuff";
import ReduxProvider from "@/app/store/ReduxProvider";

export default function ClientStuffWrapper() {
  return (
    <ReduxProvider>
      <ClientStuff />
    </ReduxProvider>
  );
}
