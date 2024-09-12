import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { editMissionVision } from '../../../api';
import { EditBtn, handleError } from '../../../helpers';

const EditFormModal = ({ data }: { data: MissionVision }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vmForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    vmForm.setFieldsValue({
      mission: data.mission,
      vision: data.vision,
    });
  };

  const handleCancel = () => setIsOpen(false);

  const editVmMutation = useMutation({
    mutationFn: async (values: EditMissionVision) => {
      try {
        const payload = {
          mission: values.mission,
          vision: values.vision,
        };
        const response = await editMissionVision(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mission-vision'] });
    },
  });
  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <Modal
        title="Edit Mission & Vision"
        open={isOpen}
        onCancel={handleCancel}
        width={700}
        closable={false}
        maskClosable={false}
        okText="Save"
        onOk={vmForm.submit}
        confirmLoading={editVmMutation.isPending}
      >
        <Form layout="vertical" form={vmForm} onFinish={editVmMutation.mutate}>
          <div>
            <Form.Item
              name="mission"
              label="Mission"
              rules={[
                {
                  required: true,
                  message: 'Please input a mission!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="vision"
              label="Vision"
              rules={[
                {
                  required: true,
                  message: 'Please input a vision!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFormModal;
