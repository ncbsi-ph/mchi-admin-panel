import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import { Card } from 'antd';
import AppointmentChart from '../components/dashboard/AppointmentChart';
import Welcome from '../components/dashboard/Welcome';

const Dashboard = () => {
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
      },
    ]);
  }, []);
  return (
    <div className="grid grid-cols-4 gap-x-5">
      <div className="col-span-3 h-full flex flex-col gap-y-5">
        <Card title="Appointment Request">
          <AppointmentChart />
        </Card>
      </div>
      <div>
        <Welcome />
      </div>
    </div>
  );
};

export default Dashboard;
