import clsx from 'clsx';

export default function UsersTableStatusCell({ getValue }) {
  const isActive = getValue() === 'active';
  return (
    <p
      className={clsx(
        'rounded-full px-2 py-1 text-center text-xs font-medium capitalize',
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      )}
    >
      {getValue()}
    </p>
  );
}
