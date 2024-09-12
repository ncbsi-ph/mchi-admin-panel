import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { editEyeService } from '../../api';
import { EditBtn, handleError } from '../../helpers';
import ServiceFormModal from './ServiceFormModal';

const EditEye = ({ data }: { data: Services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eyeForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    eyeForm.setFieldsValue({
      title: data.title,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const editEyeMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await editEyeService(payload, data.id, token);
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
      <EditBtn onClick={handleOpen} />
      <ServiceFormModal
        confirmLoading={editEyeMutation.isPending}
        form={eyeForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editEyeMutation.mutate}
        open={isOpen}
        title={`Edit ${data.title}`}
      />
    </div>
  );
};

export default EditEye;
