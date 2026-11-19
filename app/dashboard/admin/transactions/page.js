"use client";
import { Async, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import { Badge } from "@/components/ui/misc";
import { useFetch } from "@/lib/hooks";
import { fmtDate } from "@/lib/utils";

export default function Transactions() {
  const state = useFetch("/api/admin/transactions");
  return (
    <>
      <PageHeader title="Transactions" subtitle="All Stripe subscription payments." />
      <Async state={state} empty="No payments yet.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>User</Th><Th>Email</Th><Th>Role</Th><Th>Plan</Th><Th>Amount</Th><Th>Transaction ID</Th><Th>Date</Th></tr></thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id}>
                  <Td className="font-medium">{p.userName}</Td>
                  <Td>{p.userEmail}</Td>
                  <Td><Badge tone="primary" className="capitalize">{p.userRole}</Badge></Td>
                  <Td>{p.planName}</Td>
                  <Td>${p.amount}</Td>
                  <Td className="max-w-[14rem] truncate font-mono text-xs">{p.transactionId}</Td>
                  <Td>{fmtDate(p.paidAt)}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Async>
    </>
  );
}
