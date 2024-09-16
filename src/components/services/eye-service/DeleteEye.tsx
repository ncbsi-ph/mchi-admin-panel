import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteEyeService } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteEye = ({ data }: { data: Services }) => {
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

  const deleteEyeMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteEyeService(data.id, token);
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
    <DeleteModal
      isSubmitting={deleteEyeMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteEyeMutation.mutate}
      open={isOpen}
      title="Eye Service"
      target={data.title}
    />
  );
};

export default DeleteEye;
