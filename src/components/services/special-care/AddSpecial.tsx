import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { addSpecialService } from '../../../api';
import { handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const AddSpecial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [specialForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    specialForm.resetFields();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addSpecialMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await addSpecialService(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-care'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Eye Service
      </Button>
      <ServiceFormModal
        confirmLoading={addSpecialMutation.isPending}
        form={specialForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addSpecialMutation.mutate}
        open={isOpen}
        title="Add Eye Service"
      />
    </div>
  );
};

export default AddSpecial;
