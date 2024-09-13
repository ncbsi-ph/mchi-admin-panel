import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { getSpecialService } from '../api';
import { Card, Skeleton } from 'antd';
import AddSpecial from '../components/services/special-care/AddSpecial';
import EditSpecial from '../components/services/special-care/EditSpecial';
import DeleteSpecial from '../components/services/special-care/DeleteSpecial';

const ServiceSpecial = () => {
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
          <EditSpecial data={record} />
          <DeleteSpecial data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['special-care'],
    queryFn: () => getSpecialService(token),
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
          <h2>Special Care Services</h2>
          <AddSpecial />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} size="small" />
    </Card>
  );
};

export default ServiceSpecial;
