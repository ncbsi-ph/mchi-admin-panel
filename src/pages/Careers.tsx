import { useEffect, useState } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../helpers';
import { useQuery } from '@tanstack/react-query';
import { getCareers } from '../api';
import { Card, Descriptions, Skeleton } from 'antd';
import SearchFilter from '../components/SearchFilter';
import AddCareers from '../components/careers/AddCareers';

const Careers = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([0]);
  const { setItems } = useBreadcrumbActions();
  const [filteredCareers, setFilteredCareers] = useState<Careers[]>();
  const { token } = useUser();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Careers',
      },
    ]);
  }, []);

  const columns: ColumnsType<Careers> = [
    {
      title: 'Status',
      dataIndex: 'is_enabled',
      key: 'is_enabled',
      // render: (_, record) => <EditCareerStatus data={record} />,
      width: 20,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Slots',
      dataIndex: 'slots',
      key: 'slots',
    },
    {
      title: 'Date Created',
      dataIndex: 'date_posted',
      key: 'date_posted',
      render: (values) => dayjs(values).format(DATE_FORMAT),
    },
    {
      title: 'Date Modified',
      dataIndex: 'date_modified',
      key: 'date_modified',
      render: (values) => dayjs(values).format(DATE_FORMAT),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['careers'],
    queryFn: () => getCareers(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  useEffect(() => {
    setFilteredCareers(data);
  }, [data]);

  if (isLoading) return <Skeleton active />;

  if (error) return <p>{` An error has occurred: ${error}`}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    const newFilteredData = data?.filter((el) => {
      return el.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCareers(newFilteredData);
  };
  const onTableRowExpand = (expanded: boolean, record: Careers) => {
    const keys = [];
    if (expanded) keys.push(record.id);
    setExpandedRowKeys(keys);
  };
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>Careers</h2>
          <AddCareers />
        </div>
      }
    >
      <SearchFilter onSearch={handleSearch} placeHolder="Search for careers" />
      <Table
        columns={columns}
        dataSource={filteredCareers}
        expandable={{
          expandedRowRender: (record) => (
            <Descriptions column={1} title="Requrements">
              <Descriptions.Item label="Qualifications">
                {record.qualifications}
              </Descriptions.Item>
              <Descriptions.Item label="Job Type">
                {record.job_type}
              </Descriptions.Item>
              <Descriptions.Item label="Salary Range">
                {record.salary_range}
              </Descriptions.Item>
              <Descriptions.Item label="Job Summary">
                {record.job_summary}
              </Descriptions.Item>
            </Descriptions>
          ),
          onExpand: (expanded, record) => onTableRowExpand(expanded, record),
          expandedRowKeys: expandedRowKeys,
        }}
      />
    </Card>
  );
};

export default Careers;
