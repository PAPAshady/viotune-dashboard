import React from 'react';

function AlbumSongsTableIdCell({ row }) {
  return <span className="ps-1.5">{row.index + 1}</span>;
}

export default AlbumSongsTableIdCell;
