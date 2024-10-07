import { Form, FormInstance, Input, Modal } from 'antd';

interface ChangeEmailModalProps {
  title: string;
  isModalOpen: boolean;
  onCancel: () => void;
  form: FormInstance;
  onCreate: (values: PatientEmail) => void;
  confirmLoading: boolean;
}

const ChangeEmailModal = ({
  title,
  isModalOpen,
  onCancel,
  form,
  confirmLoading,
  onCreate,
}: ChangeEmailModalProps) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      centered
      confirmLoading={confirmLoading}
      okText="Save"
      onOk={form.submit}
    >
      <Form layout="vertical" form={form} onFinish={onCreate}>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input email address!',
            },
            {
              type: 'email',
              message: 'Please input a valid email address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeEmailModal;
