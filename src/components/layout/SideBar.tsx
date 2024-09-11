import { Layout } from 'antd';
import Menuitems from './Menuitems';

const { Sider } = Layout;
const SideBar = () => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        backgroundColor: '#ffffff',
        zIndex: 100,
      }}
    >
      <Menuitems />
    </Sider>
  );
};

export default SideBar;
