"use client";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { Async, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import { Badge, statusTone } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function Applicants() {
  const { token } = useAuth();
  const state = useFetch("/api/applications/applicants");

  const setStatus = async (id, status) => {
    try {
      await apiFetch(`/api/applications/${id}/status`, { token, method: "PATCH", body: { status } });
      toast.success(`Application ${status}`);
      state.reload();
    } catch (e) { toast.error(e.message); }
  };

  return (
    <>
      <PageHeader title="Applicants" subtitle="Students who applied to your tuitions." />
      <Async state={state} empty="No applications received yet.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>Student</Th><Th>Phone</Th><Th>Schedule</Th><Th>Note</Th><Th>Tuition</Th><Th>Status</Th><Th>Action</Th></tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a._id}>
                  <Td>{a.studentName}<br /><span className="text-muted-foreground">{a.studentEmail}</span></Td>
                  <Td>{a.studentPhone}</Td>
                  <Td>{a.preferredSchedule}</Td>
                  <Td className="max-w-[16rem] text-muted-foreground">{a.studentNote || "-"}</Td>
                  <Td className="font-medium">{a.tuitionTitle}</Td>
                  <Td><Badge tone={statusTone[a.status]} className="capitalize">{a.status}</Badge></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button size="sm" disabled={a.status === "accepted"} onClick={() => setStatus(a._id, "accepted")}><Check size={14} /> Accept</Button>
                      <Button size="sm" variant="outline" disabled={a.status === "rejected"} onClick={() => setStatus(a._id, "rejected")}><X size={14} /> Reject</Button>
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
