import { Dropdown, Layout, MenuProps } from 'antd';
import { useUser, useUserActions } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown, MdLogout, MdPersonOutline } from 'react-icons/md';
import { logout } from '../../api/auth';
import Cookies from 'js-cookie';
import { cookieLog, handleError } from '../../helpers';
import AccountSettings from '../AccountSettings';

const { Header } = Layout;
const HeadBar = () => {
  const { username } = useUser();
  const { removeUser } = useUserActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      removeUser();
      Cookies.remove(cookieLog);
      navigate('/login', { replace: true });
    } catch (err: any) {
      handleError(err);
    }
  };
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <AccountSettings />,
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
          onClick={handleLogout}
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
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-x-2"
        >
          {username}
          <MdKeyboardArrowDown />
        </a>
      </Dropdown>
    </Header>
  );
};

export default HeadBar;
