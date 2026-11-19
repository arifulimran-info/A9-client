"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Power, Trash2 } from "lucide-react";
import { Async, Modal, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import TuitionForm from "@/components/dashboard/TuitionForm";
import { Badge, statusTone } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { money } from "@/lib/utils";

export default function MyTuitions() {
  const { token } = useAuth();
  const state = useFetch("/api/tuitions/mine");
  const [editing, setEditing] = useState(null);

  const run = async (fn, msg) => {
    try { await fn(); toast.success(msg); state.reload(); } catch (e) { toast.error(e.message); }
  };
  const toggle = (t) => run(() => apiFetch(`/api/tuitions/${t._id}/toggle`, { token, method: "PATCH" }), t.isActive ? "Tuition closed" : "Tuition reopened");
  const remove = (t) => confirm(`Delete "${t.title}"? Its applications will be removed too.`) && run(() => apiFetch(`/api/tuitions/${t._id}`, { token, method: "DELETE" }), "Tuition deleted");
  const save = async (data) => {
    await run(() => apiFetch(`/api/tuitions/${editing._id}`, { token, method: "PATCH", body: data }), "Tuition updated");
    setEditing(null);
  };

  return (
    <>
      <PageHeader title="My tuitions" subtitle="Edit, close or delete your listings." />
      <Async state={state} empty="You have not posted any tuition yet.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>Tuition</Th><Th>Fee</Th><Th>Approval</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t._id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={t.bannerImage} alt="" className="h-12 w-16 rounded-md object-cover" />
                      <div><p className="font-medium">{t.title}</p><p className="text-muted-foreground">{t.subject} - {t.classLevel} - {t.mode}</p></div>
                    </div>
                  </Td>
                  <Td>{money(t.monthlyFee)}</Td>
                  <Td><Badge tone={statusTone[t.approvalStatus]} className="capitalize">{t.approvalStatus}</Badge></Td>
                  <Td><Badge tone={t.isActive ? "success" : "neutral"}>{t.isActive ? "Active" : "Closed"}</Badge></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditing(t)}><Pencil size={14} /> Edit</Button>
                      <Button size="sm" variant="outline" onClick={() => toggle(t)}><Power size={14} /> {t.isActive ? "Close" : "Reopen"}</Button>
                      <Button size="sm" variant="danger" onClick={() => remove(t)}><Trash2 size={14} /></Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Async>
      {editing && (
        <Modal title="Edit tuition" onClose={() => setEditing(null)}>
          <TuitionForm initial={editing} onSubmit={save} submitLabel="Save changes" />
        </Modal>
      )}
    </>
  );
}
