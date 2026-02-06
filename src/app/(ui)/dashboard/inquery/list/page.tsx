"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  message: string;
  createdAt: string;
}

/* ---------------- PORTAL ---------------- */
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function InquiryList() {
  const [data, setData] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries", { cache: "no-store" });
      const result = await res.json();
      if (result.success) setData(result.data);
    } catch (error) {
      console.error("Fetch Inquiry Error:", error);
    }
  };

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  /* ---------------- DELETE ---------------- */
  const deleteInquiry = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/inquiries?id=${deleteId}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error();

      setData((prev) => prev.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      alert("Failed to delete inquiry");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      String(item.mobile).includes(search),
  );

  return (
    <div className="p-6 relative">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span className="font-semibold text-foreground">Inquiry</span>
        <span>/</span>
        <span>List</span>
        <span className="ml-2 bg-muted px-2 py-0.5 rounded text-xs">
          {filtered.length} Inquiry
        </span>
      </div>
      <Card className="rounded-2xl shadow-md border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Inquiry List</CardTitle>

          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border min-h-[400px] max-h-[100vh] overflow-y-auto overflow-x-visible">
            <Table className="w-full">
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow className="bg-muted/40">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item._id} className="hover:bg-muted/30 transition">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{item.message}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <button
                        ref={(el) => (buttonRefs.current[item._id] = el)}
                        onClick={() =>
                          setOpenMenuId(openMenuId === item._id ? null : item._id)
                        }
                        className="p-2 rounded-lg hover:bg-muted transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v.01M12 12v.01M12 18v.01"
                          />
                        </svg>
                      </button>

                      {/* OVERLAY DROPDOWN */}
                      {openMenuId === item._id && buttonRefs.current[item._id] && (
                        <Portal>
                          <div
                            ref={menuRef}
                            className="fixed z-[9999] w-44 rounded-xl border bg-background shadow-xl animate-in fade-in zoom-in"
                            style={{
                              top:
                                buttonRefs.current[item._id]!
                                  .getBoundingClientRect().bottom + 8,
                              left:
                                buttonRefs.current[item._id]!
                                  .getBoundingClientRect().right - 176,
                            }}
                          >
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted">
                              Complete
                            </button>
                            <button
                              onClick={() => {
                                setDeleteId(item._id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </Portal>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No inquiries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* CONFIRM DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in">
            <h2 className="text-lg font-semibold mb-2">Delete Inquiry</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)} disabled={loading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteInquiry} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
