import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { editGeneralService } from '../../../api';
import { EditBtn, handleError } from '../../../helpers';
import ServiceFormModal from '../ServiceFormModal';

const EditGeneral = ({ data }: { data: Services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [generalForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    generalForm.setFieldsValue({
      title: data.title,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const editGeneralMutation = useMutation({
    mutationFn: async (values: UpsertServices) => {
      try {
        const payload = {
          title: values.title,
        };
        const response = await editGeneralService(payload, data.id, token);
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
      <EditBtn onClick={handleOpen} />
      <ServiceFormModal
        confirmLoading={editGeneralMutation.isPending}
        form={generalForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editGeneralMutation.mutate}
        open={isOpen}
        title={`Edit ${data.title}`}
      />
    </div>
  );
};

export default EditGeneral;
