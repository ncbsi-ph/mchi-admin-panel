import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import { Card, Image, Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getNewsEvents } from '../api';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../helpers';

const NewsEvents = () => {
  const { setItems } = useBreadcrumbActions();
  const { token } = useUser();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'News & Events',
      },
    ]);
  }, []);

  const columns: ColumnsType<NewsEvents> = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={150} />,
      width: 150,
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value) => <p>{dayjs(value).format(DATE_FORMAT)}</p>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['news-events'],
    queryFn: () => getNewsEvents(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{`An error has occurred: ${error}`}</p>;
  return (
    <Card title="News & Events">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default NewsEvents;
