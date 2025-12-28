import defaultCover from '@assets/images/default-cover.jpg';

function SongsTableSongCell({ row }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={row.original.cover || defaultCover}
        alt={row.original.title}
        className="size-12 rounded-md object-cover"
      />
      <div className="space-y-1">
        <p className="text-base font-semibold">{row.original.title}</p>
        <p className="text-muted-foreground">{row.original.album}</p>
      </div>
    </div>
  );
}

export default SongsTableSongCell;
