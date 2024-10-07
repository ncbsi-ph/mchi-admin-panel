import { Button, Descriptions, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

interface DetailsProps {
  data: Appointment;
}

const DATE_FORMAT = 'MM/DD/YYYY, h:mm A';

const Details = ({ data }: DetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const name = `${data.lname}, ${data.fname} ${data.mname ? data.mname : ''}`;

  const handleOpen = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);

  return (
    <div>
      <Button size="small" type="primary" onClick={handleOpen}>
        View Details
      </Button>
      <Modal
        title={`Appointment for: ${name}`}
        open={isOpen}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <Descriptions
          bordered
          labelStyle={{
            color: 'black',
          }}
          column={1}
        >
          <Descriptions.Item label="Date received">
            {dayjs(data.date_created).format(DATE_FORMAT)}
          </Descriptions.Item>
          <Descriptions.Item label="Birthdate">
            {dayjs(data.birth_date).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Contact number">
            {data.contact_no}
          </Descriptions.Item>
          <Descriptions.Item label="Email Address">
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item label="Preferred Date">
            {dayjs(data.preferred_date).format(DATE_FORMAT)}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="center">Request Services & Procedures</Divider>
        <Descriptions
          bordered
          labelStyle={{
            color: 'black',
          }}
          column={1}
        >
          <Descriptions.Item label="Services">
            {data.service ? data.service : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Procedures">
            {data.procedures ? data.procedures : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default Details;
