import KpiCard from '@components/KpiCard/KpiCard';
import KpiCardSkeleton from '../KpiCard/KpiCardSkeleton';

function KpiCardWrapper({ data, isPending }) {
  return (
    <div className="grid pb-5 grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {isPending
        ? Array.from({ length: 4 }).map((_, index) => <KpiCardSkeleton key={index} />)
        : data.map((kpi) => <KpiCard key={kpi.id} {...kpi} />)}
    </div>
  );
}

export default KpiCardWrapper;
