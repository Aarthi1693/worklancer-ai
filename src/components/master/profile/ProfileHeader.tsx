"use client";

import {
  BadgeCheck,
  Pencil,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";


export default function ProfileHeader() {
    const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
            A
          </div>

          <div>

            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900">
                Aarth
              </h1>

              <BadgeCheck className="h-6 w-6 text-blue-600" />
            </div>

            <p className="mt-1 text-slate-500">
              Frontend Developer • Field Worker
            </p>

            <div className="mt-4 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  4.8 Rating
                </span>
              </div>

              <div className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                Verified Worker
              </div>

            </div>

          </div>

        </div>

        <button
  onClick={() => router.push("/master/profile/edit")}
  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
>
  <Pencil className="h-4 w-4" />
  Edit Profile
</button>

      </div>

    </div>
  );
}