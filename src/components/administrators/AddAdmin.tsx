import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { addAdministrator } from '../../api';
import { handleError } from '../../helpers';
import AdminFormModal from './AdminFormModal';

const AddAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpenModal = () => {
    setIsOpen(true);
    adminForm.resetFields();
  };

  const addAdminMutation = useMutation({
    mutationFn: async (values: AddAdministrators) => {
      try {
        const payload = {
          userName: values.userName,
          password: values.password,
          role: values.role,
        };
        const response = await addAdministrator(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrator'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add Administrator
      </Button>
      <AdminFormModal
        title="Add Administrator"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        okText="Submit"
        onSubmit={addAdminMutation.mutate}
        confirmLoading={addAdminMutation.isPending}
        form={adminForm}
      />
    </div>
  );
};

export default AddAdmin;
