function ArtistsTableGenreCell({ getValue }) {
  return getValue() ?? <span className="text-muted-foreground text-xs">No genre specified</span>;
}

export default ArtistsTableGenreCell;
