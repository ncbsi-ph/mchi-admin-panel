import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { deleteHmo } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

const DeleteHmo = ({ data }: { data: HMO }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const deleteHmoMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteHmo(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hmo'] });
    },
  });

  return (
    <DeleteModal
      isSubmitting={deleteHmoMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteHmoMutation.mutate}
      open={isOpen}
      title="Delete Hmo"
      target={data.name}
    />
  );
};

export default DeleteHmo;
