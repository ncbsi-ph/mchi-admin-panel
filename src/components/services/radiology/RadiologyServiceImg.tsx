import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../../../store/store';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getRadiologyServiceImg } from '../../../api';

import AddRadiologyServiceImg from './AddRadiologyServiceImg';
import EditRadiologyServiceImg from './EditRadiologyServiceImg';
import DeleteRadiologyServiceImg from './DeleteRadiologyServiceImg';

const RadiologyServiceImg = () => {
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
          <EditRadiologyServiceImg data={record} />
          <DeleteRadiologyServiceImg data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['radiology-img'],
    queryFn: () => getRadiologyServiceImg(token),
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
          <h2> Radiology Service Images</h2>
          <AddRadiologyServiceImg />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default RadiologyServiceImg;
