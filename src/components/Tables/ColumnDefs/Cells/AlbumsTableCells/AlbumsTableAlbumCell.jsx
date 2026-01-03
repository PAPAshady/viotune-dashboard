import defaultCover from '@assets/images/default-cover.jpg';

function AlbumsTableAlbumCell({ row }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={row.original.cover || defaultCover}
        alt={row.original.title}
        className="size-12 rounded-md object-cover"
      />
      <p className="text-base font-semibold">{row.original.title}</p>
    </div>
  );
}

export default AlbumsTableAlbumCell;
