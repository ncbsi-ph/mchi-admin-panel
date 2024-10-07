import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { deleteCareers } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

interface DeleteCareersProps {
  data: Careers;
}

const DeleteCareers = ({ data }: DeleteCareersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const delCareersMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteCareers(data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
    },
  });
  return (
    <DeleteModal
      open={isOpen}
      onClick={handleOpen}
      onCancel={handleCancel}
      onSubmit={delCareersMutation.mutate}
      isSubmitting={delCareersMutation.isPending}
      title="Careers"
      target={data.title}
    />
  );
};

export default DeleteCareers;
