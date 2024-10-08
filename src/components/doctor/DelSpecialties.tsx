import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { delSpecialties } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

interface DelSpecialtiesProps {
  data: Specialty;
}

const DelSpecialties = ({ data }: DelSpecialtiesProps) => {
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

  const delSpecialtiesMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await delSpecialties(data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
  });

  return (
    <DeleteModal
      onClick={handleOpen}
      onCancel={handleClose}
      isSubmitting={delSpecialtiesMutation.isPending}
      onSubmit={delSpecialtiesMutation.mutate}
      open={isOpen}
      title="Specialty"
      target={data.specialty}
    />
  );
};

export default DelSpecialties;
