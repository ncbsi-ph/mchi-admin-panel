import { Outlet } from 'react-router-dom';
import { useUser } from '../store/store';
import { Button, Card } from 'antd';

const Authorization = () => {
  const { role } = useUser();

  const handleGoBack = () => {
    window.history.back();
  };
  return role === 'master' ? (
    <Outlet />
  ) : (
    <Card>
      <div className="w-full h-56 grid text-center items-center content-center justify-items-center">
        <h2 className="text-4xl font-bold text-red-600">
          <span className="text-black">401</span> Access Denied
        </h2>
        <p className="text-slate-500 text-lg mt-2">
          Sorry, you don't have permission to view this page.
        </p>
        <Button
          type="primary"
          onClick={handleGoBack}
          className="mt-4 w-24 text-center"
        >
          Go Back
        </Button>
      </div>
    </Card>
  );
};

export default Authorization;
