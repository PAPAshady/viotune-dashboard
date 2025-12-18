import React from 'react';

function PageHeader({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="text-sm text-neutral-400 md:text-[15px]">{description}</p>
    </div>
  );
}

export default PageHeader;
