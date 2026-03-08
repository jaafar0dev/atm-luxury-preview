import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const AdminConsultations = () => {
  const queryClient = useQueryClient();

  const { data: consultations } = useQuery({
    queryKey: ["admin-consultations"],
    queryFn: async () => {
      const { data } = await supabase.from("consultations").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    if (error) toast.error("Failed to update");
    else { toast.success("Updated"); queryClient.invalidateQueries({ queryKey: ["admin-consultations"] }); }
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">Consultations</h1>
      <div className="border border-border rounded-lg overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Notes</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {consultations?.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell className="max-w-[200px] truncate">{c.notes}</TableCell>
                <TableCell><Badge variant={c.status === "completed" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
                <TableCell>{formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}</TableCell>
                <TableCell>
                  {c.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, "completed")}>Mark Done</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {(!consultations || consultations.length === 0) && <p className="text-center text-muted-foreground py-8">No consultations yet.</p>}
    </div>
  );
};

export default AdminConsultations;
