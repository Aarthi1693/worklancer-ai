"use client";

import {
  CheckCircle2,
  Clock3,
  Wallet,
  Eye,
} from "lucide-react";

const transactions = [
  {
    id: "PAY-1001",
    project: "Healthcare Management System",
    provider: "ABC Technologies",
    amount: "₹50,000",
    date: "28 Jul 2026",
    status: "Released",
  },
  {
    id: "PAY-1002",
    project: "Inventory Management Portal",
    provider: "NextGen Solutions",
    amount: "₹35,000",
    date: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: "PAY-1003",
    project: "AI Resume Analyzer",
    provider: "TechNova Pvt Ltd",
    amount: "₹18,500",
    date: "18 Jul 2026",
    status: "Withdrawn",
  },
];

export default function TransactionHistory() {
  const getStatus = (status: string) => {
    switch (status) {
      case "Released":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <CheckCircle2 size={14} />
            Released
          </span>
        );

      case "Withdrawn":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <Wallet size={14} />
            Withdrawn
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
            <Clock3 size={14} />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Transaction History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View your payment releases, withdrawals, and completed transactions.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">
            <tr className="text-left">

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Payment ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Project
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Provider
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {transactions.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium text-slate-700">
                  {item.id}
                </td>

                <td className="px-6 py-5 font-semibold text-slate-900">
                  {item.project}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {item.provider}
                </td>

                <td className="px-6 py-5 font-semibold text-green-600">
                  {item.amount}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {item.date}
                </td>

                <td className="px-6 py-5">
                  {getStatus(item.status)}
                </td>

                <td className="px-6 py-5 text-center">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    <Eye size={16} />
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}