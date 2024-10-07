import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { changePatientEmail } from '../../../api';
import { handleError } from '../../../helpers';
import { MdMailOutline } from 'react-icons/md';
import ChangeEmailModal from '../ChangeEmailModal';

interface ChangeEmailAddProp {
  data: Patient;
}

const ChangeEmailAdd = ({ data }: ChangeEmailAddProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailForm] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { token } = useUser();

  const handleSavingChanges = () => {
    setIsModalOpen(true);
    emailForm.resetFields();
  };

  const changeEmailMutation = useMutation({
    mutationFn: async (values: PatientEmail) => {
      try {
        const payload = {
          id: data.id,
          email: values.email,
        };
        const response = await changePatientEmail(payload, token);
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
        <MdMailOutline /> <p>Change Email Address</p>
      </div>
      <ChangeEmailModal
        title={`Change Email Address for "${data.fname} ${data?.mname} ${data.lname}"`}
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        form={emailForm}
        onCreate={changeEmailMutation.mutate}
        confirmLoading={changeEmailMutation.isPending}
      />
    </div>
  );
};

export default ChangeEmailAdd;
