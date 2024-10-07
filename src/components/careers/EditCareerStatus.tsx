import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Space, Switch } from 'antd';
import { useUser } from '../../store/store';
import { editCareerStatus } from '../../api';
import { handleError } from '../../helpers';

interface EditCareerStatusProps {
  data: CareerStatus;
}
const EditCareerStatus = ({ data }: EditCareerStatusProps) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const editCareerStatusMutation = useMutation({
    mutationFn: async (values: any) => {
      try {
        const response = await editCareerStatus(
          values.is_enabled,
          data.id,
          token
        );
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
    <Space direction="vertical">
      <Switch
        checked={data.is_enabled}
        checkedChildren="enable"
        unCheckedChildren="disable"
        loading={editCareerStatusMutation.isPending}
        onChange={(checked) =>
          editCareerStatusMutation.mutate({
            is_enabled: checked,
            id: data.id,
          })
        }
      />
    </Space>
  );
};

export default EditCareerStatus;
