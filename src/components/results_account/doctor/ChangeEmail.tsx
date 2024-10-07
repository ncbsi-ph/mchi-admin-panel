import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { changeDoctorEmail } from '../../../api';
import { handleError } from '../../../helpers';
import { MdMailOutline } from 'react-icons/md';
import ChangeEmailModal from '../ChangeEmailModal';

interface ChangeEmailProp {
  data: Doctor;
}

const ChangeEmail = ({ data }: ChangeEmailProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleSavingChanges = () => {
    setIsModalOpen(true);
    emailForm.resetFields();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const changeEmailMutation = useMutation({
    mutationFn: async (values: DoctorEmail) => {
      try {
        const payload = {
          id: data.id,
          email: values.email,
        };
        const response = await changeDoctorEmail(payload, token);
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
        <MdMailOutline /> <p>Change Email Address</p>
      </div>
      <ChangeEmailModal
        title={`Change Email Address for "${data.fname} ${data?.mname} ${data.lname}"`}
        isModalOpen={isModalOpen}
        onCancel={handleClose}
        form={emailForm}
        onCreate={changeEmailMutation.mutate}
        confirmLoading={changeEmailMutation.isPending}
      />
    </div>
  );
};

export default ChangeEmail;
