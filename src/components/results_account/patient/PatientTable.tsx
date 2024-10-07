import { useEffect, useState } from 'react';
import { useUser } from '../../../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getPatient } from '../../../api';
import { Skeleton } from 'antd';
import SearchFilter from '../../SearchFilter';
import Actions from './Actions';

const PatientTable = () => {
  const [filteredPatientData, setFilteredPatientData] = useState<Patient[]>();
  const { token } = useUser();

  const columns: ColumnsType<Patient> = [
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
      title: 'Patient Number',
      dataIndex: 'patient_no',
      key: 'patient_no',
    },
    {
      title: 'Patient Name',
      key: 'patientName',
      render: (_, record) => (
        <span>{`${record.fname} ${record.mname} ${record.lname}`}</span>
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
      key: 'contact_no',
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
    queryKey: ['patient'],
    queryFn: () => getPatient(token),
    enabled: !!token,
    select: (data) => data.map((item) => ({ key: item.id, ...item })),
  });

  useEffect(() => {
    setFilteredPatientData(data);
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
    setFilteredPatientData(newFilteredData);
  };

  return (
    <div>
      <SearchFilter
        onSearch={handleSearch}
        placeHolder="Search for Patient's Name"
      />
      <Table columns={columns} dataSource={filteredPatientData} />
    </div>
  );
};

export default PatientTable;
