import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiNews } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import {
  MdCalendarMonth,
  MdInfoOutline,
  MdOutlineAddHomeWork,
  MdOutlineDashboard,
  MdOutlineHealthAndSafety,
  MdOutlineMedicalServices,
  MdOutlinePolicy,
} from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';
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
    getItem(
      <Link to="/services/featured">Featured</Link>,
      '/services/featured'
    ),
  ]),
  getItem(<Link to="/doctors">Doctors</Link>, '/doctors', <TbUsersGroup />),
  getItem(
    <Link to="/news-events">News & Events</Link>,
    '/news-events',
    <BiNews />
  ),
  getItem(
    <Link to="/careers">Careers</Link>,
    '/careers',
    <MdOutlineAddHomeWork />
  ),
  getItem(
    <Link to="/appointment">Appointment</Link>,
    '/appointment',
    <MdCalendarMonth />
  ),
  getItem(
    <Link to="/results-account">Results Account</Link>,
    '/results-account',
    <FaUsers />
  ),
  getItem(
    <Link to="/institution">Institution</Link>,
    '/institution',
    <HiOutlineWrenchScrewdriver />
  ),
  getItem(
    <Link to="/terms-privacy">Terms & Conditions, Privacy Policy</Link>,
    '/terms-privacy',
    <MdOutlinePolicy />
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
