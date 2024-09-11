import { useEffect } from 'react';
import { useBreadcrumbActions } from '../store/store';
import HomeBanner from '../components/home/HomeBanner';

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
    </div>
  );
};

export default Home;
