import React from 'react';

function AddSongView({ onBack }) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300" onClick={onBack}>
      AddSongView
    </div>
  );
}

export default AddSongView;
