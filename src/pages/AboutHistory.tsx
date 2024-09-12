import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../api';
import { Card, Skeleton } from 'antd';
import parse from 'html-react-parser';
import EditHistory from '../components/about/history/EditHistory';

const AboutHistory = () => {
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
        title: 'History',
      },
    ]);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['history'],
    queryFn: () => getHistory(token),
    enabled: !!token,
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: " ${error.message}`}</p>;

  let history = data ? data.history : '';

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>History</h2>
          <EditHistory data={data!} />
        </div>
      }
    >
      <div className="ck-content max-w-[1140px] m-auto">{parse(history)}</div>
    </Card>
  );
};

export default AboutHistory;
