"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import ProfilePage from "@/components/provider/profile/ProfilePage";

export default function ProviderProfileRoute() {
  return (
    <DesktopLayout>
      <ProfilePage />
    </DesktopLayout>
  );
}