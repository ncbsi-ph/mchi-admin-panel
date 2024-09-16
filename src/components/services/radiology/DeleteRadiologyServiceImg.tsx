import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteRadiologyServiceImg } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteRadiologyServiceImg = ({ data }: { data: ServicesImg }) => {
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

  const deleteRadiologyImgMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteRadiologyServiceImg(
          payload,
          data.id,
          token
        );
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['radiology-img'] });
    },
  });

  return (
    <DeleteModal
      isSubmitting={deleteRadiologyImgMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteRadiologyImgMutation.mutate}
      open={isOpen}
      title="Radiology Service Image"
    />
  );
};

export default DeleteRadiologyServiceImg;
