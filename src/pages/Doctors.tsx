import { useEffect, useState } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { Card, Image, Skeleton, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../api';
import SearchFilter from '../components/SearchFilter';
import AddDoctor from '../components/doctor/AddDoctor';
import DoctorSpecialties from '../components/doctor/DoctorSpecialties';
import EditDoctor from '../components/doctor/EditDoctor';
import DeleteDoctors from '../components/doctor/DeleteDoctors';

const Doctors = () => {
  const { token } = useUser();
  const [filteredDoctor, setFilteredDoctor] = useState<Doctors[]>();
  const { setItems } = useBreadcrumbActions();

  useEffect(() =>
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Doctors',
      },
    ])
  );

  const columns: ColumnsType<Doctors> = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={150} />,
      width: '150',
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => {
        let fullname = `Dr. ${record.lname}, ${record.fname} ${
          record.mname === null ? '' : record.mname
        }`;
        return <p className="uppercase">{fullname}</p>;
      },
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (value) => (
        <p className="uppercase">{value === null || undefined ? '-' : value}</p>
      ),
    },
    {
      title: 'Contact no.',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Specialties',
      dataIndex: 'specialty',
      key: 'specialty',
      render: (value: Specialties[]) => {
        return value === null || value?.length === 0
          ? '-'
          : value.map((item, i) => (
              <Tag
                style={{ marginRight: '8px', marginBottom: '8px' }}
                key={i}
                bordered={false}
                color="processing"
                className="uppercase"
              >
                {item.specialty}
              </Tag>
            ));
      },
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <EditDoctor data={record} />
          <DeleteDoctors data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  useEffect(() => {
    setFilteredDoctor(data);
  }, [data]);

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` "An error has occured: " ${error}`}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    const newFilteredData = data?.filter((doctor) => {
      return doctor.lname.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredDoctor(newFilteredData);
  };

  return (
    <Card
      title={
        <div className="flex justify-between">
          <h2>Doctors</h2>
          <AddDoctor />
        </div>
      }
    >
      <div className="flex justify-between items-center">
        <DoctorSpecialties />
        <SearchFilter
          onSearch={handleSearch}
          placeHolder="Search doctor's last name"
        />
      </div>
      <Table size="small" columns={columns} dataSource={filteredDoctor} />
    </Card>
  );
};

export default Doctors;
