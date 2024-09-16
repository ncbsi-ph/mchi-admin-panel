import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteRadiologyService } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteRadiology = ({ data }: { data: Services }) => {
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

  const deleteRadiologyMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteRadiologyService(data.id, token);
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
    <DeleteModal
      isSubmitting={deleteRadiologyMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteRadiologyMutation.mutate}
      open={isOpen}
      title="Radiology Service"
      target={data.title}
    />
  );
};

export default DeleteRadiology;
