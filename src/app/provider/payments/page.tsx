"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import {
  DollarSign,
  Wallet,
  CreditCard,
  TrendingUp,
} from "lucide-react";

type Transaction = {
  id: number;
  project: string;
  amount: string;
  status: string;
  date: string;
};

const transactionsData: Transaction[] = [
  {
    id: 1,
    project: "E-Commerce Platform",
    amount: "₹25,000",
    status: "Paid",
    date: "02 Jun 2026",
  },
  {
    id: 2,
    project: "AI Chatbot Development",
    amount: "₹18,500",
    status: "Pending",
    date: "29 May 2026",
  },
  {
    id: 3,
    project: "Portfolio Website",
    amount: "₹12,000",
    status: "Paid",
    date: "25 May 2026",
  },
];

export default function PaymentsPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [transactions, setTransactions] =
    useState(transactionsData);

  const handleReleasePayment = (id: number) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              status: "Paid",
            }
          : transaction
      )
    );

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Payments & Revenue
          </h1>

          <p className="text-slate-400 mt-2">
            Track earnings, transactions and payment insights.
          </p>
        </div>

        {/* Main Stats */}

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <Wallet className="text-green-400 mb-3" />
            <p className="text-slate-400 text-sm">
              Total Revenue
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              ₹1.8L
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <DollarSign className="text-blue-400 mb-3" />
            <p className="text-slate-400 text-sm">
              This Month
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              ₹52K
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <CreditCard className="text-purple-400 mb-3" />
            <p className="text-slate-400 text-sm">
              Pending Payments
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              ₹18.5K
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <TrendingUp className="text-yellow-400 mb-3" />
            <p className="text-slate-400 text-sm">
              Growth Rate
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              +18%
            </h2>
          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Paid Projects
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              12
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Pending Invoices
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              3
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Total Clients
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              18
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Avg Project Value
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              ₹15.2K
            </h2>
          </div>

        </div>

        {/* Transactions */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Transactions
          </h2>

          <div className="space-y-4">

            {transactions.map((transaction) => (

              <div
                key={transaction.id}
                className="
                  rounded-xl
                  border
                  border-white/[0.08]
                  p-5
                "
              >

                <div className="flex justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {transaction.project}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {transaction.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <h3 className="font-semibold">
                      {transaction.amount}
                    </h3>

                    <span
                      className={`text-sm ${
                        transaction.status === "Paid"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                </div>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() =>
                      setSelectedTransaction(
                        transaction
                      )
                    }
                    className="
                      px-4
                      py-2
                      rounded-xl
                      border
                      border-white/[0.08]
                    "
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        "Invoice Download Started"
                      )
                    }
                    className="
                      px-4
                      py-2
                      rounded-xl
                      border
                      border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
                    "
                  >
                    Invoice
                  </button>

                  {transaction.status ===
                    "Pending" && (
                    <button
                      onClick={() =>
                        handleReleasePayment(
                          transaction.id
                        )
                      }
                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                      "
                    >
                      Release Payment
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Transaction Popup */}

        {selectedTransaction && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                w-[500px]
                rounded-3xl
                bg-slate-950
                border
                border-white/[0.08]
                p-8
              "
            >
              <h2 className="text-2xl font-bold mb-6">
                Transaction Details
              </h2>

              <div className="space-y-4">

                <p>
                  <strong>Project:</strong>{" "}
                  {selectedTransaction.project}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  {selectedTransaction.amount}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedTransaction.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {selectedTransaction.date}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedTransaction(null)
                }
                className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                "
              >
                Close
              </button>

            </div>
          </div>
        )}

        {/* Success Popup */}

        {showSuccess && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                bg-slate-950
                border
                border-green-500/20
                rounded-3xl
                p-8
                text-center
                w-[420px]
              "
            >
              <div className="text-6xl mb-4">
                ✅
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Payment Released
              </h2>

              <p className="text-slate-400 mt-3">
                Transaction completed successfully.
              </p>
            </div>
          </div>
        )}

      </div>
    </DesktopLayout>
  );
}