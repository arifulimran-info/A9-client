"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import TuitionCard from "@/components/TuitionCard";
import { Input, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/misc";
import { apiFetch } from "@/lib/api";

export default function BrowseTuitions() {
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [debounced, setDebounced] = useState(search);
  const [subject, setSubject] = useState(params.get("subject") || "");
  const [classLevel, setClassLevel] = useState("");
  const [mode, setMode] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ subjects: [], classLevels: [] });
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => { apiFetch("/api/tuitions/filters").then(setFilters).catch(() => {}); }, []);
  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setData(null);
    setError(false);
    const q = new URLSearchParams({ page, limit: 9 });
    if (debounced) q.set("search", debounced);
    if (subject) q.set("subject", subject);
    if (classLevel) q.set("classLevel", classLevel);
    if (mode) q.set("mode", mode);
    apiFetch(`/api/tuitions?${q}`).then(setData).catch(() => setError(true));
  }, [debounced, subject, classLevel, mode, page]);

  const change = (setter) => (e) => { setter(e.target.value); setPage(1); };
  const reset = () => { setSearch(""); setSubject(""); setClassLevel(""); setMode(""); setPage(1); };

  return (
    <div className="mt-8">
      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or subject" className="pl-10" aria-label="Search" />
        </div>
        <Select value={subject} onChange={change(setSubject)} aria-label="Subject">
          <option value="">All subjects</option>
          {filters.subjects.map((s) => <option key={s}>{s}</option>)}
        </Select>
        <Select value={classLevel} onChange={change(setClassLevel)} aria-label="Class level">
          <option value="">All class levels</option>
          {filters.classLevels.map((s) => <option key={s}>{s}</option>)}
        </Select>
        <Select value={mode} onChange={change(setMode)} aria-label="Mode">
          <option value="">Online and Offline</option>
          <option>Online</option>
          <option>Offline</option>
        </Select>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {error ? (
          <p className="col-span-full py-16 text-center text-muted-foreground">Could not load tuitions. Check your connection and try again.</p>
        ) : !data ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96" />)
        ) : data.tuitions.length === 0 ? (
          <div className="col-span-full grid place-items-center gap-3 py-16 text-center">
            <SearchX size={40} className="text-muted-foreground" />
            <p className="font-semibold">No tuitions match these filters</p>
            <Button variant="outline" onClick={reset}>Clear filters</Button>
          </div>
        ) : (
          data.tuitions.map((t) => <TuitionCard key={t._id} t={t} />)
        )}
      </div>

      {data && data.pages > 1 && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          {Array.from({ length: data.pages }).map((_, i) => (
            <Button key={i} size="sm" variant={page === i + 1 ? "default" : "outline"} onClick={() => setPage(i + 1)}>{i + 1}</Button>
          ))}
          <Button variant="outline" size="sm" disabled={page === data.pages} onClick={() => setPage(page + 1)}>Next</Button>
        </nav>
      )}
    </div>
  );
}
