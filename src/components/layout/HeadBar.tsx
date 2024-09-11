import { Dropdown, Layout, MenuProps } from 'antd';
import { useUser, useUserActions } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown, MdLogout, MdPersonOutline } from 'react-icons/md';

const { Header } = Layout;
const HeadBar = () => {
  const { username } = useUser();
  const { removeUser } = useUserActions();
  const navigate = useNavigate();

  //   const handleLogout = async () => {
  //     try {
  //         await logout
  //     }
  //   }
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Account Settings',
    },
    {
      key: 2,
      label: (
        <Link to="/administrators">
          <div className="flex items-center gap-x-2">
            <MdPersonOutline className="text-base" />
            Administrator
          </div>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 3,
      label: (
        <div
          className="flex items-center gap-x-2 text-red-600"
          // onClick={handleLogout}
        >
          <MdLogout className="text-base" />
          <p>Logout</p>
        </div>
      ),
    },
  ];
  return (
    <Header className="bg-white grid justify-end overflow-auto z-10 sticky top-0">
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <a className="flex items-center gap-x-2">
          Allan
          <MdKeyboardArrowDown />
        </a>
      </Dropdown>
    </Header>
  );
};

export default HeadBar;
