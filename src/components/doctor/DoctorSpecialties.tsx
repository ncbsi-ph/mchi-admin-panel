import { useState } from 'react';
import { useUser } from '../../store/store';
import Table, { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '../../api';
import { Button, Card, Modal } from 'antd';
import AddSpecialties from './AddSpecialties';
import DelSpecialties from './DelSpecialties';

const DoctorSpecialties = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const columns: ColumnsType<Specialty> = [
    {
      dataIndex: 'specialty',
      key: 'specialty',
      title: 'Specialty',
      render: (values) => <p className="uppercase">{values}</p>,
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <DelSpecialties data={record} />
        </div>
      ),
    },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ['specialties'],
    queryFn: () => getSpecialties(token),
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
  });

  if (error) return <p>{`"An error has occurred: ${error}" `}</p>;

  return (
    <div className="mb-3">
      <Button type="primary" onClick={handleOpen} loading={isLoading}>
        List of Specialties
      </Button>
      <Modal open={isOpen} footer={null} onCancel={handleClose} width={700}>
        <Card
          className="m-5"
          title={
            <div className="flex justify-between">
              <h2>Specialties</h2>
              <AddSpecialties />
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Modal>
    </div>
  );
};

export default DoctorSpecialties;
