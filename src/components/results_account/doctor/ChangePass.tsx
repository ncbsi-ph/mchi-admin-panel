import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { changeDoctorPassword } from '../../../api';
import { handleError } from '../../../helpers';
import { MdLockOutline } from 'react-icons/md';
import ChangePassModal from '../ChangePassModal';

interface ChangePassProps {
  data: Doctor;
}

const ChangePass = ({ data }: ChangePassProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message } = App.useApp();
  const [doctorPassForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleSavingChanges = () => {
    setIsModalOpen(true);
    doctorPassForm.resetFields();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const changePassMutation = useMutation({
    mutationFn: async (values: DoctorPassword) => {
      try {
        const payload = {
          id: data.id,
          newPassword: values.newPassword,
        };
        const response = await changeDoctorPassword(payload, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
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
        onCreate={changePassMutation.mutate}
        form={doctorPassForm}
        confirmLoading={changePassMutation.isPending}
      />
    </div>
  );
};

export default ChangePass;
