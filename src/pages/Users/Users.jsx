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
import { getUsersQuery, getUsersStatsQuery } from '@/queries/users';
import columns from '@/columns/columns.users.jsx';
import useDebounce from '@/hooks/useDebounce';

const rolesOptions = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'banned', label: 'Banned' },
];

const authProviderOptions = [
  { value: 'email', label: 'Email' },
  { value: 'google', label: 'Google' },
  { value: 'github', label: 'Github' },
];

function Users() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [role, setRole] = useState();
  const [status, setStatus] = useState();
  const [provider, setProvider] = useState();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const { data: stats, isPending: isStatsPending } = useQuery(getUsersStatsQuery());
  const isMobile = useIsMobile();

  const filters = { role, status, provider };

  const { data, isLoading } = useQuery(
    getUsersQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
  };

  const onStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const onProviderChange = (e) => {
    const value = e.target.value;
    setProvider(value);
  };

  const clearFilters = () => {
    setRole('');
    setStatus('');
    setProvider('');
  };

  const usersKpiInfos = [
    { id: 1, value: stats?.totalUsers || 0, title: 'Total Users' },
    { id: 2, value: stats?.totalAdmins || 0, title: 'Total Admins' },
    { id: 3, value: stats?.activeUsers || 0, title: 'Active Users' },
    { id: 4, value: stats?.bannedUsers || 0, title: 'Banned Users' },
  ];

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
      <SearchInput
        placeholder="Search by email or username..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FilterBar filters={filters} onClearAll={clearFilters}>
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
          value={provider}
          onChange={onProviderChange}
        />
      </FilterBar>
      <KpiCardWrapper data={usersKpiInfos} isPending={isStatsPending} />
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
