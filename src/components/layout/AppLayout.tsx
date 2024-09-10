import { Breadcrumb, Layout } from 'antd';
import { useBreadcrumb } from '../../store/store';
import SideBar from './SideBar';
import HeadBar from './HeadBar';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;
const AppLayout = () => {
  const items = useBreadcrumb();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout className="min-w-[1120px]">
        <HeadBar />
        <Content className="px-5">
          <Breadcrumb className="py-5" items={items} />
          <Outlet />
        </Content>
        <Footer className="grid place-content-center text-center">
          <p>
            Mercy Community Hospital Inc. © 2024 All Rights Reserved
            <span className="text-xs block text-slate-600">
              Developed by New Comlogik Business Systems Inc.
            </span>
          </p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
