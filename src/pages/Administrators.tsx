import { useEffect, useState } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { Card, Skeleton, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAdministrator } from '../api';
import SearchFilter from '../components/SearchFilter';
import AddAdmin from '../components/administrators/AddAdmin';

const Administrators = () => {
  const { setItems } = useBreadcrumbActions();
  const { username } = useUser();
  const { token } = useUser();
  const [filteredData, setFilteredData] = useState<Administrators[]>();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Administrators',
      },
    ]);
  }, []);

  const columns: ColumnsType<Administrators> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value) => {
        let color = '';
        if (value === 'master') color = 'blue';
        else if (value === 'admin') color = 'green';
        return (
          <Tag color={color} className="capitalize">
            {value}
          </Tag>
        );
      },
    },
    {
      width: 50,
      key: 'action',
      render: (_, record) =>
        record.username === username ? (
          <Tag color="blue" bordered={false}>
            me
          </Tag>
        ) : (
          <div className="flex items-center">
            {/* <OverridePassword data={record} />
            <DeleteAdmin data={record} /> */}
          </div>
        ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['administrator'],
    queryFn: () => getAdministrator(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (isLoading) return <Skeleton active />;

  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;

  const handleSearch = (e: any) => {
    let value = e.target.value;

    const newFilterdData = data?.filter((el) => {
      return el.username.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(newFilterdData);
  };

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>Admin</h2>
          <AddAdmin />
        </div>
      }
    >
      <SearchFilter onSearch={handleSearch} placeHolder="Search Username" />
      <Table size="small" columns={columns} dataSource={filteredData} />
    </Card>
  );
};

export default Administrators;
