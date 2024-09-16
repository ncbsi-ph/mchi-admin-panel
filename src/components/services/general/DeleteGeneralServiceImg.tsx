import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { deleteGeneralServiceImg } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteGeneralServiceImg = ({ data }: { data: ServicesImg }) => {
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
        const response = await deleteGeneralServiceImg(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['general-img'] });
    },
  });

  return (
    <DeleteModal
      isSubmitting={deleteEyeImgMutation.isPending}
      onCancel={handleClose}
      onClick={handleOpen}
      onSubmit={deleteEyeImgMutation.mutate}
      open={isOpen}
      title="General Service Image"
    />
  );
};

export default DeleteGeneralServiceImg;
