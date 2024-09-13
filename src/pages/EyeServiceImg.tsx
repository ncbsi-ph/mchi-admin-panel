import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../store/store';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getEyeServiceImg } from '../api';
import AddEyeServiceImg from '../components/services/eye-service/AddEyeServiceImg';
import EditEyeServiceImg from '../components/services/eye-service/EditEyeServiceImg';
import DeleteEyeServiceImg from '../components/services/eye-service/DeleteEyeServiceImg';

const EyeServiceImg = () => {
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
          <EditEyeServiceImg data={record} />
          <DeleteEyeServiceImg data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['eye-service-img'],
    queryFn: () => getEyeServiceImg(token),
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
          <h2> Eye Service Images</h2>
          <AddEyeServiceImg />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default EyeServiceImg;
