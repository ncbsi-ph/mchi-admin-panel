import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../store/store';
import { getGeneralService } from '../api';
import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton } from 'antd';
import AddGeneral from '../components/services/general/AddGeneral';
import EditGeneral from '../components/services/general/EditGeneral';
import DeleteGeneral from '../components/services/general/DeleteGeneral';

const ServiceGeneral = () => {
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
          <EditGeneral data={record} />
          <DeleteGeneral data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['general-service'],
    queryFn: () => getGeneralService(token),
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
          <h2>General Services</h2>
          <AddGeneral />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} size="small" />
    </Card>
  );
};

export default ServiceGeneral;
