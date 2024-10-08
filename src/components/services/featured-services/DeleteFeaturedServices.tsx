import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeaturedServices } from '../../../api';
import { handleError } from '../../../helpers';
import DeleteModal from '../../DeleteModal';

const DeleteFeaturedServices = ({ data }: { data: FeaturedService }) => {
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

  const deleteFeaturedServiceMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteFeaturedServices(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured-services'] });
    },
  });
  return (
    <DeleteModal
      title="Featured Services"
      open={isOpen}
      onClick={handleOpen}
      onCancel={handleCancel}
      target={data.title}
      onSubmit={deleteFeaturedServiceMutation.mutate}
      isSubmitting={deleteFeaturedServiceMutation.isPending}
    />
  );
};

export default DeleteFeaturedServices;
