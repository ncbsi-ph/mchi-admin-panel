import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoctors } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

const DeleteDoctors = ({ data }: { data: Doctors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { message } = App.useApp();
  const { token } = useUser();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const deleteDoctorMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await deleteDoctors(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });

  return (
    <DeleteModal
      onClick={handleOpen}
      title="Doctor"
      open={isOpen}
      onCancel={handleClose}
      isSubmitting={deleteDoctorMutation.isPending}
      onSubmit={deleteDoctorMutation.mutate}
      target={`${data.lname}, ${data.fname}`}
    />
  );
};

export default DeleteDoctors;
