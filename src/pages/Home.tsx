import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import HomeBanner from '../components/home/HomeBanner';
import { Divider } from 'antd';
import HomeAbout from '../components/home/HomeAbout';

const Home = () => {
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Home',
      },
    ]);
  }, []);

  return (
    <div>
      <HomeBanner />
      <Divider />
      <HomeAbout />
    </div>
  );
};

export default Home;
