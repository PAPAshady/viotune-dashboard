import { Table, TableCaption, TableBody, TableCell, TableRow } from '@components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';

const tableData = [
  { id: 1, title: 'John Doe uploaded Midnight Dreams', time: '3 hours ago', type: 'song' },
  { id: 2, title: 'John Doe uploaded Midnight Dreams', time: '3 hours ago', type: 'song' },
  { id: 3, title: 'John Doe uploaded Midnight Dreams', time: '3 hours ago', type: 'song' },
  { id: 4, title: 'John Doe uploaded Midnight Dreams', time: '3 hours ago', type: 'song' },
];

function RecentActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-0 min-[375px]:px-6">
        <Table>
          <TableCaption top>Recent Activity</TableCaption>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="pt-1">{item.title}</p>
                  <span className="mt-1 block pb-2 text-xs text-neutral-400">{item.time}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium">
                    {item.type}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentActivityTable;
