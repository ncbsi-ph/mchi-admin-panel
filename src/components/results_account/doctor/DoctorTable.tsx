import { useEffect, useState } from 'react';
import { useUser } from '../../../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getDoctor } from '../../../api';
import { Skeleton } from 'antd';
import SearchFilter from '../../SearchFilter';
import Actions from './Actions';

const DoctorTable = () => {
  const [filteredDoctorData, setFilteredDoctorData] = useState<Doctor[]>();
  const { token } = useUser();

  const columns: ColumnsType<Doctor> = [
    {
      dataIndex: 'actions',
      key: 'actions',
      width: 1,
      render: (_, record) => {
        if (record.is_verify) return <Actions data={record} />;
        return null;
      },
    },

    {
      title: 'Doctor Code',
      dataIndex: 'doctor_code',
      key: 'doctorCode',
    },
    {
      title: 'Doctor Name',
      key: 'doctorName',
      render: (_, record) => (
        <span>{`${record.fname} ${record.mname} ${record.lname}`} </span>
      ),
      sorter: (a, b) =>
        a.lname.toLowerCase() < b.lname.toLowerCase() ? 1 : -1,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_no',
      key: 'contactNumber',
    },
    {
      title: 'Email Verified',
      dataIndex: 'is_verify',
      key: 'emailVerified',
      render: (value) => {
        if (value) return 'Yes';
        return 'No';
      },
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctor(token),
    enabled: !!token,
    select: (data) => data.map((item) => ({ key: item.id, ...item })),
  });

  useEffect(() => {
    setFilteredDoctorData(data);
  }, [data]);
  if (isLoading) return <Skeleton active />;

  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;
  const handleSearch = (e: any) => {
    let value = e.target.value;
    const newFilteredData = data?.filter((el) => {
      return (
        el.fname.toLowerCase().includes(value.toLowerCase()) ||
        el.lname.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredDoctorData(newFilteredData);
  };

  return (
    <div>
      {' '}
      <SearchFilter
        onSearch={handleSearch}
        placeHolder="Search for Doctor's Name"
      />
      <Table columns={columns} dataSource={filteredDoctorData} />
    </div>
  );
};

export default DoctorTable;
