import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import ServiceRadiology from '../components/services/radiology/ServiceRadiology';
import { Divider } from 'antd';
import RadiologyServiceImg from '../components/services/radiology/RadiologyServiceImg';

const RadiologyServiceCenter = () => {
  const { setItems } = useBreadcrumbActions();
  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Services',
      },
      {
        title: 'Radiology',
      },
    ]);
  });
  return (
    <div>
      <ServiceRadiology />
      <Divider />
      <RadiologyServiceImg />
    </div>
  );
};

export default RadiologyServiceCenter;
