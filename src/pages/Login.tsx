import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../store/store';
import Cookies from 'js-cookie';
import { cookieLog, handleError } from '../helpers';
import { login } from '../api/auth';
import { Button, Form, Input, Spin } from 'antd';

interface FormValueTypes {
  username: string;
  password: string;
}
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserActions();
  const isLoggedIn = Cookies.get(cookieLog);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn]);

  const handleLogin = async (values: FormValueTypes) => {
    try {
      setIsLoading(true);
      const response = await login(values);
      console.log(response);
      setUser(response.username, response.role, response.token);
      navigate('/', { replace: true });
      Cookies.set(cookieLog, 'true', {
        path: '/',
        expires: 2,
      });
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return isLoggedIn ? (
    <div className="w-full h-screen grid items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="bg-[url('/mchi-bg.jpg')] bg-cover bg-bottom">
      {' '}
      <div className="max-w-md grid m-auto h-screen content-center ">
        <div className="shadow-md px-10 py-5 rounded-lg bg-white">
          <h1 className="font-medium text-xl text-center py-10 text-primary">
            Mercy Community Hospital Corp.
            <span className="block text-slate-500">Admin Panel</span>
          </h1>
          <Form layout="vertical" requiredMark={false} onFinish={handleLogin}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="grid justify-end">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
