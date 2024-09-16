import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiNews } from 'react-icons/bi';
import {
  MdInfoOutline,
  MdOutlineDashboard,
  MdOutlineHealthAndSafety,
  MdOutlineMedicalServices,
} from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(<Link to="/">Dashboard</Link>, '/', <MdOutlineDashboard />),
  getItem(<Link to="/home">Home</Link>, '/home', <AiOutlineHome />),
  getItem('About', 'About', <MdInfoOutline />, [
    getItem(<Link to="/about/history">History</Link>, '/about/history'),
    getItem(
      <Link to="/about/mission-vision">Mission & Vision</Link>,
      '/about/mission-vision'
    ),
  ]),
  getItem(<Link to="/hmo">HMO</Link>, '/hmo', <MdOutlineHealthAndSafety />),
  getItem('Services', 'Services', <MdOutlineMedicalServices />, [
    getItem(
      <Link to="/services/eye-center">Eye Center</Link>,
      '/services/eye-center'
    ),
    getItem(
      <Link to="/services/special-care">Special Care</Link>,
      '/services/special-care'
    ),
    getItem(<Link to="/services/general">General</Link>, '/services/general'),
    getItem(
      <Link to="/services/radiology">Radiology</Link>,
      '/services/radiology'
    ),
  ]),
  getItem(
    <Link to="/news-events">News & Events</Link>,
    '/news-events',
    <BiNews />
  ),
];
const Menuitems = () => {
  let location = useLocation();

  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    if (location) {
      if (currentKey !== location.pathname) {
        setCurrentKey(location.pathname);
      }
    }
  }, [location, currentKey]);
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentKey]}
        items={items}
        onSelect={(info) => setCurrentKey(info.key)}
      />
    </>
  );
};

export default Menuitems;
