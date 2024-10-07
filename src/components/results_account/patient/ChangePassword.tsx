import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { overridePatientPassword } from '../../../api';
import { handleError } from '../../../helpers';
import { MdLockOutline } from 'react-icons/md';
import ChangePassModal from '../ChangePassModal';

interface ChangePasswordProps {
  data: Patient;
}

const ChangePassword = ({ data }: ChangePasswordProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleSavingChanges = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const editPatientMutation = useMutation({
    mutationFn: async (values: PatientPassword) => {
      try {
        const payload = {
          id: data.id,
          newPassword: values.newPassword,
        };
        const response = await overridePatientPassword(payload, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
      setIsModalOpen(false);
    },
  });
  return (
    <div>
      <div className="flex items-center gap-x-1" onClick={handleSavingChanges}>
        <MdLockOutline /> <p>Change Password</p>
      </div>
      <ChangePassModal
        title={`Change password for "${data.fname} ${data?.mname} ${data.lname}"`}
        isModalOpen={isModalOpen}
        onCancel={handleClose}
        onCreate={editPatientMutation.mutate}
        form={form}
        confirmLoading={editPatientMutation.isPending}
      />
    </div>
  );
};

export default ChangePassword;
