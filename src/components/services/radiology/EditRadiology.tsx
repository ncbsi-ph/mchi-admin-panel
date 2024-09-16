import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { editRadiologyService } from '../../../api';
import { EditBtn, handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const EditRadiology = ({ data }: { data: Services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [radForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    radForm.setFieldsValue({
      title: data.title,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const editRadiologyMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await editRadiologyService(payload, data.id, token);
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
      <EditBtn onClick={handleOpen} />
      <ServiceFormModal
        confirmLoading={editRadiologyMutation.isPending}
        form={radForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editRadiologyMutation.mutate}
        open={isOpen}
        title={`Edit ${data.title}`}
      />
    </div>
  );
};

export default EditRadiology;
