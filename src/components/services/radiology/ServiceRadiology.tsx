import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../../../store/store';
import { useQuery } from '@tanstack/react-query';
import { getRadiologyService } from '../../../api';
import { Card, Skeleton } from 'antd';
import AddRadiology from './AddRadiology';
import EditRadiology from './EditRadiology';
import DeleteRadiology from './DeleteRadiology';

const ServiceRadiology = () => {
  const { token } = useUser();

  const columns: ColumnsType<Services> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <EditRadiology data={record} />
          <DeleteRadiology data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['radiology'],
    queryFn: () => getRadiologyService(token),
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
    <Card
      title={
        <div className="flex justify-between">
          <h2>Radiology Services</h2>
          <AddRadiology />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} size="small" />
    </Card>
  );
};

export default ServiceRadiology;
