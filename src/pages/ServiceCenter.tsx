import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import ServiceEye from './ServiceEye';
import { Divider } from 'antd';
import EyeServiceImg from './EyeServiceImg';

const ServiceCenter = () => {
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
        title: 'Eye Center',
      },
    ]);
  });
  return (
    <div>
      <ServiceEye />
      <Divider />
      <EyeServiceImg />
    </div>
  );
};

export default ServiceCenter;
