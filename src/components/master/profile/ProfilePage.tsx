"use client";

import ProfileHeader from "./ProfileHeader";
import BasicInformation from "./BasicInformation";
import WorkerInformation from "./WorkerInformation";
import SkillsCard from "./SkillsCard";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import CertificationCard from "./CertificationCard";
import AvailabilityCard from "./AvailabilityCard";
import PortfolioCard from "./PortfolioCard";
import StatisticsCard from "./StatisticsCard";

export default function ProfilePage() {
  return (
    <div className="space-y-8">

      <ProfileHeader />

      <div className="grid gap-8 xl:grid-cols-2">
        <BasicInformation />
        <WorkerInformation />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <SkillsCard />
        <ExperienceCard />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <EducationCard />
        <CertificationCard />
      </div>

      <AvailabilityCard />

      <PortfolioCard />

      <StatisticsCard />

    </div>
  );
}