import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteSpecialServiceImg } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteSpecialServiceImg = ({ data }: { data: ServicesImg }) => {
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

  const deleteSpecialImgMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteSpecialServiceImg(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-service-img'] });
    },
  });

  return (
    <DeleteModal
      isSubmitting={deleteSpecialImgMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteSpecialImgMutation.mutate}
      open={isOpen}
      title="Special Care Service Image"
    />
  );
};

export default DeleteSpecialServiceImg;
