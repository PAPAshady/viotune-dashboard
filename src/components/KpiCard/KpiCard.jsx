import { Card, CardContent } from '@components/ui/card';

function KpiCard({ value, title }) {
  return (
    <Card>
      <CardContent className="p-4 md:p-2 lg:p-4">
        <p className="text-foreground text-2xl font-bold md:text-xl lg:text-2xl">
          {value.toLocaleString()}
        </p>
        <p className="text-muted-foreground text-sm">{title}</p>
      </CardContent>
    </Card>
  );
}

export default KpiCard;
