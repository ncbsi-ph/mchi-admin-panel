import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../store/store';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getSpecialServiceImg } from '../api';
import AddSpecialServiceImg from '../components/services/special-care/AddSpecialServiceImg';
import EditSpecialServiceImg from '../components/services/special-care/EditSpecialServiceImg';
import DeleteSpecialServiceImg from '../components/services/special-care/DeleteSpecialServiceImg';

const SpecialServiceImg = () => {
  const { token } = useUser();

  const columns: ColumnsType<ServicesImg> = [
    {
      title: 'Images',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={150} />,
      width: '150',
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <EditSpecialServiceImg data={record} />
          <DeleteSpecialServiceImg data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['special-service-img'],
    queryFn: () => getSpecialServiceImg(token),
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
          <h2> Special Care Images</h2>
          <AddSpecialServiceImg />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default SpecialServiceImg;
