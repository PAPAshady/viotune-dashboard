import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import SearchInput from '@components/SearchInput/SearchInput';
import PageHeader from '@/components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
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
import { getUsersQuery } from '@/queries/users';

const rolesOptions = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'banned', label: 'Banned' },
];

const authProviderOptions = [
  { value: 'email', label: 'Email' },
  { value: 'google', label: 'Google' },
  { value: 'github', label: 'Github' },
];

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Users' },
  { id: 2, value: 200, title: 'Acvtive Users' },
  { id: 3, value: 0, title: 'Suspended Users' },
  { id: 4, value: 15, title: 'Banned Users' },
];

const columns = [
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

function Users() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [role, setRole] = useState();
  const [status, setStatus] = useState();
  const [authProvider, setAuthProvider] = useState();
  const isMobile = useIsMobile();
  const { data, isLoading } = useQuery(getUsersQuery(pagination));

  const onRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
  };

  const onStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const onAuthProviderChange = (e) => {
    const value = e.target.value;
    setAuthProvider(value);
  };

  return (
    <>
      <PageHeader title="Users" description="Manage users, roles, and activity.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add User
        </Button>
      </PageHeader>
      <SearchInput placeholder="Search by email or username..." />
      <FilterBar>
        <FilterSelectBox
          filterName="Roles"
          placeholder="Select role"
          options={rolesOptions}
          value={role}
          onChange={onRoleChange}
        />
        <FilterSelectBox
          filterName="Status"
          placeholder="Select status"
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
        />
        <FilterSelectBox
          filterName="Auth provider"
          placeholder="Select provider"
          options={authProviderOptions}
          value={authProvider}
          onChange={onAuthProviderChange}
        />
      </FilterBar>
      <KpiCardWrapper data={kpiInfos} />
      <PrimaryTable
        columns={columns}
        rows={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default Users;
