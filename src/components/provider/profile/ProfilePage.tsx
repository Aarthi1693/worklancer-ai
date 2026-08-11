"use client";

import { useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PersonalInfo from "./PersonalInfo";
import CompanyInfo from "./CompanyInfo";
import ChangePassword from "./ChangePassword";
import RecentActivity from "./RecentActivity";
import EditProfileModal from "./EditProfileModal";

export default function ProfilePage() {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div className="space-y-8">

        <ProfileHeader
          onEdit={() => setOpenEdit(true)}
        />

        <ProfileStats />

        <div className="grid gap-8 lg:grid-cols-2">
          <PersonalInfo />
          <CompanyInfo />
        </div>

        <ChangePassword />

        <RecentActivity />

      </div>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
}