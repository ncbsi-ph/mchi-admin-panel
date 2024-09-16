import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { addRadiologyService } from '../../../api';
import { handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const AddRadiology = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [radForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    radForm.resetFields();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addRadiologyMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await addRadiologyService(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['radiology'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Radiology Service
      </Button>
      <ServiceFormModal
        confirmLoading={addRadiologyMutation.isPending}
        form={radForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addRadiologyMutation.mutate}
        open={isOpen}
        title="Add Radiology Service"
      />
    </div>
  );
};

export default AddRadiology;
