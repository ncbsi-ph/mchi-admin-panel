import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

const data = [
  { status: 'Pending', count: 10, date: '2024-09-01' },
  { status: 'Confirmed', count: 15, date: '2024-09-02' },
  { status: 'Cancelled', count: 5, date: '2024-09-03' },
  { status: 'Pending', count: 8, date: '2024-09-04' },
  { status: 'Confirmed', count: 18, date: '2024-09-05' },
  { status: 'Cancelled', count: 3, date: '2024-09-06' },
  { status: 'Pending', count: 7, date: '2024-09-07' },
  { status: 'Confirmed', count: 20, date: '2024-09-08' },
];

const AppointmentChart = () => {
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
