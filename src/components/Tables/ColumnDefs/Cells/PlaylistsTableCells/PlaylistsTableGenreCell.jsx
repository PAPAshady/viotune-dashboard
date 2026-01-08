function PlaylistsTableGenreCell({ getValue }) {
  return getValue() ?? <span className="text-muted-foreground">No genres specified</span>;
}

export default PlaylistsTableGenreCell;
