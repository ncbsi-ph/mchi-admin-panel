import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { editAdministrator } from '../../api';
import { EditBtn, handleError } from '../../helpers';
import OverrideModalForm from './OverrideModalForm';

interface OverridePasswordProps {
  data: Administrators;
}

const OverridePassword = ({ data }: OverridePasswordProps) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [adminForm] = Form.useForm();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    adminForm.resetFields();
  };

  const editAdministratorMutation = useMutation({
    mutationFn: async (values: Override) => {
      try {
        const payload = {
          newPass: values.newPass,
        };

        const response = await editAdministrator(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrator'] });
      setIsOpen(false);
    },
  });

  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <OverrideModalForm
        form={adminForm}
        open={isOpen}
        onCreate={editAdministratorMutation.mutate}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default OverridePassword;
