import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { editSpecialService } from '../../../api';
import { EditBtn, handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const EditSpecial = ({ data }: { data: Services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [specialForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    specialForm.setFieldsValue({
      title: data.title,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const editSpecialMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await editSpecialService(payload, data.id, token);
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
      {' '}
      <EditBtn onClick={handleOpen} />
      <ServiceFormModal
        confirmLoading={editSpecialMutation.isPending}
        form={specialForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editSpecialMutation.mutate}
        open={isOpen}
        title={`Edit ${data.title}`}
      />
    </div>
  );
};

export default EditSpecial;
