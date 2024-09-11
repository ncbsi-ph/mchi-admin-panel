import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { deleteAdministrator } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

interface DeleteAdminProps {
  data: Administrators;
}
const DeleteAdmin = ({ data }: DeleteAdminProps) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useUser();

  const deleteAdminMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await deleteAdministrator(data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['administrator'] });
      setIsOpen(false);
    },
  });
  return (
    <div>
      <DeleteModal
        open={isOpen}
        onClick={() => {
          setIsOpen(true);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        onSubmit={() => deleteAdminMutation.mutate()}
        title="Admin/Master"
        isSubmitting={deleteAdminMutation.isPending}
        target={data.username}
      />
    </div>
  );
};

export default DeleteAdmin;
