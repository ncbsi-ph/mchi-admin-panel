import Table, { ColumnsType } from 'antd/es/table';
import { useUser } from '../../store/store';
import parse from 'html-react-parser';
import { useQuery } from '@tanstack/react-query';
import { getHomeAbout } from '../../api';
import { Card, Skeleton } from 'antd';

const HomeAbout = () => {
  const { token } = useUser();

  const columns: ColumnsType<HomeAbout> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Sub Title',
      dataIndex: 'sub_title',
      key: 'sub_title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => (
        <div className="ck-content">{parse(value)}</div>
      ),
    },

    {
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          {/* <EditAboutFormModal data={record} /> */}
        </div>
      ),
      width: 15,
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-about'],
    queryFn: () => getHomeAbout(token),
    select: (data) => [
      {
        key: data.id,
        ...data,
      },
    ],
  });
  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occured " ${error.message}`}</p>;

  return (
    <Card title="Home About">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default HomeAbout;
