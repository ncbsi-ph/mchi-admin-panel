import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, Modal, Switch, Tooltip } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editAppointmentStatus, getAppointmentStatus } from '../../api';
import { handleError } from '../../helpers';
import Editor from '../Editor';

const Status = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();
  const { token } = useUser();

  const handleCancel = () => setIsModalOpen(false);

  const handleDescriptionChange = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setDescription(value);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['appointment-status'],
    queryFn: () => getAppointmentStatus(token),
    enabled: !!token,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setDescription(data!.message);
    form.setFieldsValue({
      status: data?.status,
      message: data?.message,
    });
  };

  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;

  const editStatusMutation = useMutation({
    mutationFn: async (values: AppointmentStatus) => {
      try {
        const payload = {
          status: values.status,
          message: description,
        };
        const response = await editAppointmentStatus(payload, token);
        message.success(response);
        setIsModalOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointment-status'] });
    },
  });
  return (
    <div>
      <Tooltip title="Click to edit appointment status & message">
        <Button
          type={data?.status ? 'primary' : 'default'}
          loading={isLoading}
          onClick={handleOpenModal}
        >
          Appointment Status: {data?.status ? 'Enabled' : 'Disabled'}
        </Button>
      </Tooltip>
      <Modal
        open={isModelOpen}
        onCancel={handleCancel}
        okText="Save"
        onOk={form.submit}
        confirmLoading={editStatusMutation.isPending}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editStatusMutation.mutate}
        >
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch
              id="appointment-status"
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
            />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <Editor
              data={description}
              wImage={true}
              onChange={handleDescriptionChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Status;
