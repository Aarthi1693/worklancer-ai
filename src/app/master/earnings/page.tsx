"use client";

import DesktopLayout from "@/components/layout/desktop-layout";

const payments = [
  {
    id: 1,
    date: "01 Jun 2026",
    client: "TechCorp",
    amount: "₹12,000",
    status: "Paid",
  },
  {
    id: 2,
    date: "28 May 2026",
    client: "StartupX",
    amount: "₹8,500",
    status: "Pending",
  },
  {
    id: 3,
    date: "20 May 2026",
    client: "AI Labs",
    amount: "₹15,000",
    status: "Paid",
  },
  {
    id: 4,
    date: "12 May 2026",
    client: "GrowthHub",
    amount: "₹10,500",
    status: "Paid",
  },
];

export default function EarningsPage() {
  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Earnings Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Track income, payments and financial growth.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Total Earnings
            </p>

            <p className="text-green-400 text-sm mt-2">
  ↑ 18% from last month
</p>

            <h2 className="text-3xl font-bold mt-2">
              ₹2,45,000
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              This Month
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              ₹42,500
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Pending Payments
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              ₹8,500
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Withdrawable Balance
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              ₹34,000
            </h2>
          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Earnings Trend */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Earnings Overview
            </h2>

            <div className="space-y-4">

              {[
                ["January", "₹20,000"],
                ["February", "₹25,000"],
                ["March", "₹32,000"],
                ["April", "₹28,000"],
                ["May", "₹38,000"],
                ["June", "₹42,500"],
              ].map(([month, amount]) => (
                <div
                  key={month}
                  className="flex justify-between"
                >
                  <span>{month}</span>

                  <span className="font-semibold text-blue-400">
                    {amount}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* Withdraw Card */}
          <div
            className="
              rounded-3xl
              border
              border-green-500/20
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Withdraw Funds
            </h2>

            <p className="text-slate-400">
              Available Balance
            </p>

            <h3 className="text-4xl font-bold text-green-400 mt-3">
              ₹34,000
            </h3>

            <button
              className="
                mt-6
                w-full
                py-3
                rounded-xl
                bg-green-600
                hover:bg-green-700
                transition
                font-semibold
              "
            >
              Withdraw Funds
            </button>
          </div>

        </div>
        
        <button
  className="
    px-4
    py-2
    rounded-xl
    border
    border-white/[0.08]
    hover:bg-white/5
  "
>
  Export Report
</button>

        {/* Payment History */}
        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            overflow-hidden
          "
        >
          <div className="p-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-bold">
              Payment History
            </h2>
          </div>

          <table className="w-full">

            <thead>
              <tr className="text-left border-b border-white/[0.08]">

                <th className="p-5 text-slate-400">
                  Date
                </th>

                <th className="p-5 text-slate-400">
                  Client
                </th>

                <th className="p-5 text-slate-400">
                  Amount
                </th>

                <th className="p-5 text-slate-400">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                  "
                >
                  <td className="p-5">
                    {payment.date}
                  </td>

                  <td className="p-5">
                    {payment.client}
                  </td>

                  <td className="p-5 font-semibold">
                    {payment.amount}
                  </td>

                  <td className="p-5">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs

                        ${
                          payment.status === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      `}
                    >
                      {payment.status}
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* AI Forecast */}
        <div
          className="
            rounded-3xl
            border
            border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            AI Income Forecast
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <div>
              <p className="text-slate-400">
                Next Month Forecast
              </p>

              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                ₹55,000
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Expected Growth
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                +18%
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Top Revenue Skill
              </p>

              <h3 className="text-2xl font-bold text-purple-400 mt-2">
                UI/UX Design
              </h3>
            </div>

          </div>
        </div>

      </div>
    </DesktopLayout>
  );
}