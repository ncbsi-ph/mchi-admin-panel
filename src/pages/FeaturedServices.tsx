import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedServices } from '../api';
import AddFeaturedServices from '../components/services/featured-services/AddFeaturedServices';
import EditFeaturedServices from '../components/services/featured-services/EditFeaturedServices';
import DeleteFeaturedServices from '../components/services/featured-services/DeleteFeaturedServices';

const FeaturedServices = () => {
  const { token } = useUser();
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Services',
      },

      {
        title: 'Featured Services',
      },
    ]);
  });

  const columns: ColumnsType<FeaturedService> = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={150} />,
      width: '150',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <p className="flex justify-end">
          <EditFeaturedServices data={record} />
          <DeleteFeaturedServices data={record} />
        </p>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['featured-services'],
    queryFn: () => getFeaturedServices(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;
  return (
    <Card
      title={
        <div className="flex justify-between">
          <h2>Featured Services</h2>
          <AddFeaturedServices />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default FeaturedServices;
