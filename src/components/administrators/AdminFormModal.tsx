import { Form, FormInstance, Input, Modal, Select } from 'antd';

interface AdminFormModal {
  open: boolean;
  title: string;
  onCancel: () => void;
  form: FormInstance;
  onSubmit: (values: any) => void;
  okText: string;
  confirmLoading: boolean;
}
const AdminFormModal = ({
  open,
  title,
  onCancel,
  onSubmit,
  form,
  okText,
  confirmLoading,
}: AdminFormModal) => {
  return (
    <div>
      <Modal
        open={open}
        title={title}
        onCancel={onCancel}
        width={700}
        closable={false}
        maskClosable={false}
        okText={okText}
        onOk={form.submit}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item
            name="role"
            label="Select Role"
            initialValue="admin"
            help={
              <p className="text-sm">
                A master administrator can add, edit and delete administrators.
                Enable atyour own discretion.
              </p>
            }
          >
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: 'master',
                  label: 'Master',
                },
                {
                  value: 'admin',
                  label: 'Admin',
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Pleae input username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input a password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>{' '}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.resolve(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminFormModal;
