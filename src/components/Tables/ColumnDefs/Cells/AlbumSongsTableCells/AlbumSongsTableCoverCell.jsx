import defaultImage from '@assets/images/default-cover.jpg';

function AlbumSongsTableCoverCell({ getValue }) {
  return (
    <div className="size-10 overflow-hidden rounded-md border">
      <img src={getValue() || defaultImage} className="size-full object-cover" />
    </div>
  );
}

export default AlbumSongsTableCoverCell;
