"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { Async, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import { Badge, statusTone } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { money } from "@/lib/utils";

export default function AdminTuitions() {
  const { token } = useAuth();
  const [status, setStatus] = useState("");
  const state = useFetch(`/api/admin/tuitions${status ? `?status=${status}` : ""}`);

  const decide = async (id, approvalStatus) => {
    try {
      await apiFetch(`/api/admin/tuitions/${id}/approval`, { token, method: "PATCH", body: { approvalStatus } });
      toast.success(`Tuition ${approvalStatus}`);
      state.reload();
    } catch (e) { toast.error(e.message); }
  };

  return (
    <>
      <PageHeader title="Tuition approval" subtitle="Approve or reject tuition posts from tutors.">
        <Select className="w-44" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
        </Select>
      </PageHeader>
      <Async state={state} empty="No tuitions in this view.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>Tuition</Th><Th>Tutor</Th><Th>Fee</Th><Th>Status</Th><Th>Action</Th></tr></thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t._id}>
                  <Td><p className="font-medium">{t.title}</p><p className="text-muted-foreground">{t.subject} - {t.classLevel} - {t.mode}</p></Td>
                  <Td>{t.tutorName}<br /><span className="text-muted-foreground">{t.tutorEmail}</span></Td>
                  <Td>{money(t.monthlyFee)}</Td>
                  <Td><Badge tone={statusTone[t.approvalStatus]} className="capitalize">{t.approvalStatus}</Badge></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button size="sm" disabled={t.approvalStatus === "approved"} onClick={() => decide(t._id, "approved")}><Check size={14} /> Approve</Button>
                      <Button size="sm" variant="outline" disabled={t.approvalStatus === "rejected"} onClick={() => decide(t._id, "rejected")}><X size={14} /> Reject</Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Async>
    </>
  );
}
