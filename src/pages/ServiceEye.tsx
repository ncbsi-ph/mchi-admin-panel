import { useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getEyeService } from '../api';
import { Card, Skeleton } from 'antd';
import AddEye from '../components/services/eye-service/AddEye';
import EditEye from '../components/services/eye-service/EditEye';
import DeleteEye from '../components/services/eye-service/DeleteEye';

const ServiceEye = () => {
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
          <EditEye data={record} />
          <DeleteEye data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['eye-center'],
    queryFn: () => getEyeService(token),
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
          <h2>Eye Services</h2>
          <AddEye />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} size="small" />
    </Card>
  );
};

export default ServiceEye;
