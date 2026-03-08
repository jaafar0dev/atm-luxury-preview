import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

const AdminMessages = () => {
  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">Messages</h1>
      <div className="border border-border rounded-lg overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
          <TableBody>
            {messages?.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell className="max-w-[300px] truncate">{m.message}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {(!messages || messages.length === 0) && <p className="text-center text-muted-foreground py-8">No messages yet.</p>}
    </div>
  );
};

export default AdminMessages;
