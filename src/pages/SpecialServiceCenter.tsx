import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import ServiceSpecial from './ServiceSpecial';
import { Divider } from 'antd';

const SpecialServiceCenter = () => {
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
        title: 'Special Care',
      },
    ]);
  });
  return (
    <div>
      <ServiceSpecial />
      <Divider />
    </div>
  );
};

export default SpecialServiceCenter;
