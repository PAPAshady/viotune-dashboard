function TimeCell({ getValue }) {
  return (
    <span className="text-muted-foreground text-xs">
      {new Date(getValue()).toLocaleString('en-CA', { hour12: false }).replace(/-/g, '/')}
    </span>
  );
}

export default TimeCell;
