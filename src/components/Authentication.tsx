import { useEffect, useState } from 'react';
import { useUserActions } from '../store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../api/auth';
import Cookies from 'js-cookie';
import { cookieLog, handleError } from '../helpers';
import { Spin } from 'antd';

const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const refresh = async () => {
    setIsLoading(true);
    try {
      const response = await refreshAccessToken();
      setUser(response.username, response.role, response.token);

      Cookies.set(cookieLog, 'true', {
        path: '/',
        expires: 2,
      });
    } catch (err: any) {
      console.log(err);
      Cookies.remove(cookieLog);
      navigate('/login', { replace: true });
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get(cookieLog);
    if (isLoggedIn) {
      refresh();
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return isLoading ? (
    <div className="w-full h-screen grid items-center justify-center">
      <Spin />
    </div>
  ) : (
    <Outlet />
  );
};

export default Authentication;
