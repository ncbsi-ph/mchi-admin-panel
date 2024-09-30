import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { delNewsEvents } from '../../api';
import { handleError } from '../../helpers';
import DeleteModal from '../DeleteModal';

interface DeleteNewsEventProps {
  data: NewsEvents;
}
const DeleteNewsEvent = ({ data }: DeleteNewsEventProps) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useUser();

  const handleOpen = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);

  const deleteNewsEventMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload: Delete = {
          img: data.img,
        };
        const response = await delNewsEvents(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-events'] });
    },
  });
  return (
    <div>
      <DeleteModal
        open={isOpen}
        onClick={handleOpen}
        onCancel={handleCancel}
        onSubmit={deleteNewsEventMutation.mutate}
        isSubmitting={deleteNewsEventMutation.isPending}
        title="news-events"
        target={data.title}
      />
    </div>
  );
};

export default DeleteNewsEvent;
