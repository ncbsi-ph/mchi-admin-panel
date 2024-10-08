import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { useUser } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { getChartAppointments } from '../../api';
import { Skeleton } from 'antd';

const AppointmentChart = () => {
  const { token } = useUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ['appointment-chart'],
    queryFn: () => getChartAppointments(token),
    enabled: !!token,
  });
  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: "${error}`}</p>;

  return (
    <div className="max-w-[1200px] h-[400px] m-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="status" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="count" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="date" stroke="#1F75FE" yAxisId={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentChart;
