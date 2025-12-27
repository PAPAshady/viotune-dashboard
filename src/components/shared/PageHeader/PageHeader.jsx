import React from 'react';

function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="text-sm text-neutral-400 md:text-[15px]">{description}</p>
      </div>
      {children && <div className="-mt-6 flex gap-2 sm:m-0 sm:justify-end">{children}</div>}
    </div>
  );
}

export default PageHeader;
