import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

const AdminInquiries = () => {
  const { data: inquiries } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">Inquiries</h1>
      <div className="border border-border rounded-lg overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Type</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
          <TableBody>
            {inquiries?.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>{i.email}</TableCell>
                <TableCell>{i.phone}</TableCell>
                <TableCell>{i.property_type}</TableCell>
                <TableCell className="max-w-[200px] truncate">{i.message}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(i.created_at), { addSuffix: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {(!inquiries || inquiries.length === 0) && <p className="text-center text-muted-foreground py-8">No inquiries yet.</p>}
    </div>
  );
};

export default AdminInquiries;
