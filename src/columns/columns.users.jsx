import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import UsersTableUserCell from '@/components/Tables/ColumnDefs/Cells/UsersTableCells/UsersTableUserCell';
import UsersTableRoleCell from '@/components/Tables/ColumnDefs/Cells/UsersTableCells/UsersTableRoleCell';
import ActionsCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';
import TimeCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/TimeCell';
import UsersTableProvidersCell from '@/components/Tables/ColumnDefs/Cells/UsersTableCells/UsersTableProvidersCell';
import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import UsersTableUserCellSkeleton from '@components/Tables/ColumnDefs/Cells/UsersTableCells/Skeleton/UsersTableUserCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import UsersTableProvidersCellSkeleton from '@components/Tables/ColumnDefs/Cells/UsersTableCells/Skeleton/UsersTableProvidersCellSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';

export default [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'user',
    header: 'User',
    cell: (props) => <UsersTableUserCell {...props} />,
    meta: { skeleton: <UsersTableUserCellSkeleton /> },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => <span className="text-xs">{getValue()}</span>,
    meta: { skeleton: <TextSkeleton className="w-30 max-w-none" /> },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (props) => <UsersTableRoleCell {...props} />,
    meta: { skeleton: <TextSkeleton className="h-5 w-30" /> },
  },

  {
    accessorKey: 'last_sign_in_at',
    header: 'Last Sign In',
    cell: (props) => <TimeCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-30 max-w-none" /> },
  },
  {
    accessorKey: 'providers',
    header: 'Auth Providers',
    cell: (props) => <UsersTableProvidersCell {...props} />,
    meta: { skeleton: <UsersTableProvidersCellSkeleton /> },
  },
  {
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
    header: 'Actions',
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
