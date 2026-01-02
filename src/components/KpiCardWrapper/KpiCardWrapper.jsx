import KpiCard from "@components/KpiCard/KpiCard";

function KpiCardWrapper({ data }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {data.map((kpi) => (
        <KpiCard key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}

export default KpiCardWrapper;
