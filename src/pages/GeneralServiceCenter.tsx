import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import ServiceGeneral from './ServiceGeneral';
import { Divider } from 'antd';
import GeneralServiceImg from '../components/services/general/GeneralServiceImg';

const GeneralServiceCenter = () => {
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
        title: 'General',
      },
    ]);
  });
  return (
    <div>
      <ServiceGeneral />
      <Divider />
      <GeneralServiceImg />
    </div>
  );
};

export default GeneralServiceCenter;
