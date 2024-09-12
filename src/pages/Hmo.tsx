import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getHmo } from '../api';
import AddHmo from '../components/HMO/AddHmo';
import EditHmo from '../components/HMO/EditHmo';
import DeleteHmo from '../components/HMO/DeleteHmo';

const Hmo = () => {
  const { token } = useUser();
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },

      {
        title: 'HMO',
      },
    ]);
  });

  const columns: ColumnsType<HMO> = [
    {
      title: 'Logo',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={150} />,
      width: '150',
    },
    {
      title: 'HMO Provider',
      dataIndex: 'name',
      key: 'name',
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <EditHmo data={record} />
          <DeleteHmo data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['hmo'],
    queryFn: () => getHmo(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: " ${error.message}`}</p>;

  return (
    <Card
      title={
        <div className="flex justify-between">
          <h2> HMO</h2>
          <AddHmo />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default Hmo;
