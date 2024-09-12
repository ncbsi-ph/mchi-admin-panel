import { useState } from 'react';
import { useUser } from '../../store/store';
import { App } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHomeBanner } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

const DeleteHomeBanner = ({ data }: { data: HomeBannerType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useUser();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const deleteHomeBannerMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteHomeBanner(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-banner'] });
    },
  });

  return (
    <DeleteModal
      open={isOpen}
      onClick={handleOpen}
      onCancel={handleCancel}
      onSubmit={deleteHomeBannerMutation.mutate}
      isSubmitting={deleteHomeBannerMutation.isPending}
      title="Banner"
    />
  );
};

export default DeleteHomeBanner;
