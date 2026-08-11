"use client";

import EarningsHeader from "./EarningsHeader";
import EarningsStats from "./EarningsStats";
import EarningsFilters from "./EarningsFilters";
import PaymentCard from "./PaymentCard";
import TransactionHistory from "./TransactionHistory";

export default function EarningsPage() {
  return (
    <div className="space-y-8">

      <EarningsHeader />

      <EarningsStats />

      <EarningsFilters />

      <div className="grid gap-6">
        <PaymentCard />
        <PaymentCard />
      </div>

      <TransactionHistory />

    </div>
  );
}