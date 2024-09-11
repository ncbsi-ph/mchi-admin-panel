import { Form, FormInstance, Input, Modal } from 'antd';

interface Values {
  newPass: string;
}

interface OverrideModalFormProps {
  form: FormInstance;
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const OverrideModalForm = ({
  open,
  onCancel,
  form,
  onCreate,
}: OverrideModalFormProps) => {
  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      okText="Save"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form} onFinish={onCreate}>
        <Form.Item
          label="Password"
          name="newPass"
          rules={[{ required: true, message: 'Please input a pasword!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          hasFeedback
          dependencies={['newPass']}
          rules={[
            {
              required: true,
              message: 'Please confirm password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPass') === value) {
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

export default OverrideModalForm;
