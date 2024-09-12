import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { addEyeService } from '../../api';
import { handleError } from '../../helpers';
import ServiceFormModal from './ServiceFormModal';

const AddEye = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [labForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    labForm.resetFields();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addEyeMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await addEyeService(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eye-center'] });
    },
  });
  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Eye Service
      </Button>
      <ServiceFormModal
        confirmLoading={addEyeMutation.isPending}
        form={labForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addEyeMutation.mutate}
        open={isOpen}
        title="Add Eye Service"
      />
    </div>
  );
};

export default AddEye;
