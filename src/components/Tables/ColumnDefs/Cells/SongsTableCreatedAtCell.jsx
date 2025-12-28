function SongsTableCreatedAtCell({ getValue }) {
  return (
    <span className="text-muted-foreground">
      {new Date(getValue()).toLocaleString('en-CA', { hour12: false }).replace(/-/g, '/')}
    </span>
  );
}

export default SongsTableCreatedAtCell;
