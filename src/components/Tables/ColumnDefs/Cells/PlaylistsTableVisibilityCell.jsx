function PlaylistsTableVisibilityCell({ getValue }) {
  return (
    <span className={getValue() ? 'text-green-400' : 'text-red-400'}>
      {getValue() ? 'Public' : 'Private'}
    </span>
  );
}

export default PlaylistsTableVisibilityCell;
