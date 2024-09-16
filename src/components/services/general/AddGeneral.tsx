import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { addGeneralService } from '../../../api';
import { handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const AddGeneral = () => {
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

  const addGeneralMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await addGeneralService(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['general-service'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add General Service
      </Button>
      <ServiceFormModal
        confirmLoading={addGeneralMutation.isPending}
        form={labForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addGeneralMutation.mutate}
        open={isOpen}
        title="Add General Service"
      />
    </div>
  );
};

export default AddGeneral;
