import { Form, FormInstance, Input, Modal } from 'antd';

interface ChangePassModalProps {
  title: string;
  isModalOpen: boolean;
  onCancel: () => void;
  form: FormInstance;
  onCreate: (values: PatientPassword) => void;
  confirmLoading: boolean;
}

const ChangePassModal = ({
  title,
  isModalOpen,
  onCancel,
  form,
  confirmLoading,
  onCreate,
}: ChangePassModalProps) => {
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
          label="New Password"
          name="newPassword"
          extra="Minimum of 8 characters"
          rules={[
            {
              required: true,
              message: 'Please enter your new password!',
            },
            {
              min: 8,
              message: 'Minimum password length should be 8 characters',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassModal;
