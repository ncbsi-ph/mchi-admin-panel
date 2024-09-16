import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../../../store/store';
import { Card, Image, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getGeneralServiceImg } from '../../../api';
import AddGeneralServiceImg from './AddGeneralServiceImg';
import EditGeneralServiceImg from './EditGeneralServiceImg';
import DeleteGeneralServiceImg from './DeleteGeneralServiceImg';

const GeneralServiceImg = () => {
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
          <EditGeneralServiceImg data={record} />
          <DeleteGeneralServiceImg data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['general-img'],
    queryFn: () => getGeneralServiceImg(token),
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
          <h2> General Service Images</h2>
          <AddGeneralServiceImg />
        </div>
      }
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default GeneralServiceImg;
