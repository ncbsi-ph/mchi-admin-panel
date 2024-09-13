import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteEyeServiceImg } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteEyeServiceImg = ({ data }: { data: ServicesImg }) => {
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

  const deleteEyeImgMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteEyeServiceImg(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eye-service-img'] });
    },
  });

  return (
    <DeleteModal
      isSubmitting={deleteEyeImgMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteEyeImgMutation.mutate}
      open={isOpen}
      title="Delete Eye Service Image"
    />
  );
};

export default DeleteEyeServiceImg;
