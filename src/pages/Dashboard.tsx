import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';

const Dashboard = () => {
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
      },
    ]);
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
