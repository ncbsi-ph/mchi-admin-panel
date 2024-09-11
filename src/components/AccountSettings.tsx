import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useUser } from '../store/store';
import { changePassword } from '../api';
import { MdSettings } from 'react-icons/md';

const AccountSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token, username } = useUser();

  const handleClick = () => {
    setIsModalOpen(true);
    accountForm.resetFields();
  };

  const changePasswordMutation = useMutation({
    mutationFn: async (values: Password) => {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      if (username) {
        const response = await changePassword(payload, username, token);
        message.success(response);
      } else {
        console.error('No user log in');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrator'] });
      setIsModalOpen(false);
    },
  });

  return (
    <>
      <div className="flex items-center gap-x-2" onClick={handleClick}>
        <MdSettings className="text-base" />
        <p>Account Settings</p>
      </div>
      <Modal
        title="Account Settingds"
        open={isModalOpen}
        confirmLoading={changePasswordMutation.isPending}
        closable={false}
        maskClosable={false}
        okText="Save"
        onCancel={() => setIsModalOpen(false)}
        onOk={accountForm.submit}
      >
        <Form
          layout="vertical"
          form={accountForm}
          onFinish={changePasswordMutation.mutate}
        >
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            dependencies={['newPassword']}
            hasFeedback
            name="confirmPassword"
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
    </>
  );
};

export default AccountSettings;
