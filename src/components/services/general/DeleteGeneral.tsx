import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteGeneralService } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteGeneral = ({ data }: { data: Services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const deleteGeneralMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteGeneralService(data.id, token);
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
    <DeleteModal
      isSubmitting={deleteGeneralMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteGeneralMutation.mutate}
      open={isOpen}
      title="General Service"
      target={data.title}
    />
  );
};

export default DeleteGeneral;
