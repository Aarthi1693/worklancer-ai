"use client";

import PaymentHeader from "./PaymentHeader";
import EscrowStats from "./EscrowStats";
import PaymentFilters from "./PaymentFilters";
import EscrowCard from "./EscrowCard";
import TransactionTable from "./TransactionTable";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">

      <PaymentHeader />

      <EscrowStats />

      <PaymentFilters />

      <div className="grid gap-6">
        <EscrowCard />
        <EscrowCard />
      </div>

      <TransactionTable />

    </div>
  );
}