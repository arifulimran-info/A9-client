"use client";
import { toast } from "sonner";
import { Async, PageHeader, TableWrap, Td, Th } from "@/components/dashboard/ui";
import { Badge } from "@/components/ui/misc";
import { Select } from "@/components/ui/form";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { fmtDate } from "@/lib/utils";

export default function AdminUsers() {
  const { token, user } = useAuth();
  const state = useFetch("/api/admin/users");

  const changeRole = async (id, role) => {
    try {
      await apiFetch(`/api/admin/users/${id}/role`, { token, method: "PATCH", body: { role } });
      toast.success("Role updated");
      state.reload();
    } catch (e) { toast.error(e.message); }
  };

  return (
    <>
      <PageHeader title="User management" subtitle="Change roles for any registered user." />
      <Async state={state} empty="No users found.">
        {(rows) => (
          <TableWrap>
            <thead><tr><Th>User</Th><Th>Email</Th><Th>Plan</Th><Th>Joined</Th><Th>Role</Th></tr></thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u._id}>
                  <Td className="font-medium">{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td><Badge tone={u.plan === "pro" ? "accent" : "neutral"} className="uppercase">{u.plan || "free"}</Badge></Td>
                  <Td>{u.createdAt ? fmtDate(u.createdAt) : "-"}</Td>
                  <Td>
                    <Select className="h-9 w-36" value={u.role} disabled={u._id === user.id} onChange={(e) => changeRole(u._id, e.target.value)} aria-label={`Role of ${u.name}`}>
                      <option value="student">Student</option><option value="tutor">Tutor</option><option value="admin">Admin</option>
                    </Select>
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
