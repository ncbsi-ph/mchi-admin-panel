import { Card, Tabs, TabsProps } from 'antd';
import { useBreadcrumbActions } from '../store/store';
import { useEffect } from 'react';

const items: TabsProps['items'] = [
  {
    key: 'patient',
    label: `Patients`,
    //   children: <PatientTable />,
  },
  {
    key: 'doctor',
    label: `Doctors`,
    //   children: <DoctorTable />,
  },
];

const ResultAcc = () => {
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Results Account',
      },
    ]);
  }, []);

  return (
    <Card>
      <Tabs defaultActiveKey="1" items={items} type="card" />
    </Card>
  );
};

export default ResultAcc;
