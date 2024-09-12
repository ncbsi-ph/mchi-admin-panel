import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getMissionVision } from '../api';
import { Card, Skeleton } from 'antd';
import EditFormModal from '../components/about/mission-vision/EditFormModal';

const AboutMissionVision = () => {
  const { setItems } = useBreadcrumbActions();
  const { token } = useUser();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'About',
      },
      {
        title: 'Mission & Vision',
      },
    ]);
  }, []);

  const columns: ColumnsType<MissionVision> = [
    {
      title: 'Mission',
      dataIndex: 'mission',
      key: 'mission',
    },
    {
      title: 'Vision',
      dataIndex: 'vision',
      key: 'vision',
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-x-1 justify-end">
          <EditFormModal data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['mission-vision'],
    queryFn: () => getMissionVision(token),
    enabled: !!token,
    select: (data) => [
      {
        key: data.id,
        ...data,
      },
    ],
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: " ${error.message}`}</p>;

  return (
    <Card title="Mission & Vision">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default AboutMissionVision;
