import { useEffect, useState } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getAllAppointment } from '../api';
import { Card, Skeleton } from 'antd';
import SearchFilter from '../components/SearchFilter';
import Details from '../components/appointment/Details';
import Status from '../components/appointment/Status';

const DATE_FORMAT = 'MM/DD/YYYY, h:mm A';
const Appointments = () => {
  const { setItems } = useBreadcrumbActions();
  const [filteredAppointment, setFilteredAppointment] =
    useState<Appointment[]>();
  const { token } = useUser();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Appointment',
      },
    ]);
  }, []);

  const columns: ColumnsType<Appointment> = [
    {
      title: 'Patient name',
      key: 'patientName',
      render: (_, record) => {
        const mname = record.mname === null ? '' : record.mname;
        return `${record.lname}, ${record.fname} ${mname}`;
      },
    },
    {
      title: 'Date created',
      dataIndex: 'date_created',
      key: 'date_created',
      render: (value) => dayjs(value).format(DATE_FORMAT),
      sorter: (a, b) =>
        dayjs(a.date_created).unix() - dayjs(b.date_created).unix(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Preferred Date',
      dataIndex: 'preferred_date',
      key: 'preferred_date',
      render: (value) => dayjs(value).format(DATE_FORMAT),
    },
    {
      key: 'action',
      render: (_, record) => (
        <div>
          <Details data={record} />
        </div>
      ),
      width: 10,
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['appointment'],
    queryFn: () => getAllAppointment(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  useEffect(() => {
    setFilteredAppointment(data);
  }, [data]);

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const newFilteredData = data?.filter((el) => {
      return (
        el.fname.toLowerCase().includes(value.toLowerCase()) ||
        el.lname.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredAppointment(newFilteredData);
  };
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>Appointments</h2>

          <Status />
        </div>
      }
    >
      <SearchFilter onSearch={handleSearch} placeHolder="Search patient name" />
      <Table columns={columns} dataSource={filteredAppointment} />
    </Card>
  );
};

export default Appointments;
