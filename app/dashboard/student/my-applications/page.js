"use client";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Async, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import { Badge, statusTone } from "@/components/ui/misc";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { fmtDate, money } from "@/lib/utils";

export default function MyApplications() {
  const { token } = useAuth();
  const state = useFetch("/api/applications/mine");

  const cancel = async (id) => {
    if (!confirm("Cancel this application?")) return;
    try {
      await apiFetch(`/api/applications/${id}`, { token, method: "DELETE" });
      toast.success("Application cancelled");
      state.reload();
    } catch (e) { toast.error(e.message); }
  };

  return (
    <>
      <PageHeader title="My applications" subtitle="Track every tuition you applied for.">
        <Link href="/tuitions" className={buttonVariants({ variant: "outline" })}>Browse tuitions</Link>
      </PageHeader>
      <Async state={state} empty="You have not applied to any tuition yet.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>Tuition</Th><Th>Tutor</Th><Th>Monthly fee</Th><Th>Applied</Th><Th>Status</Th><Th>Action</Th></tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a._id}>
                  <Td className="font-medium">{a.tuitionTitle}</Td>
                  <Td>{a.tutorName}<br /><span className="text-muted-foreground">{a.tutorEmail}</span></Td>
                  <Td>{money(a.monthlyFee)}</Td>
                  <Td>{fmtDate(a.appliedAt)}</Td>
                  <Td><Badge tone={statusTone[a.status]} className="capitalize">{a.status}</Badge></Td>
                  <Td>{a.status === "pending" ? <Button size="sm" variant="outline" onClick={() => cancel(a._id)}><Trash2 size={15} /> Cancel</Button> : <span className="text-muted-foreground">-</span>}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Async>
    </>
  );
}
