import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteSpecialService } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteSpecial = ({ data }: { data: Services }) => {
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

  const deleteSpecialMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteSpecialService(data.id, token);
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
    <DeleteModal
      isSubmitting={deleteSpecialMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteSpecialMutation.mutate}
      open={isOpen}
      title="Delete Special Service"
      target={data.title}
    />
  );
};

export default DeleteSpecial;
