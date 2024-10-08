import { useState } from 'react';
import { useUser } from '../../store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { addSpecialties } from '../../api';
import { handleError } from '../../helpers';
import SpecialtyFormModal from './SpecialtyFormModal';

const AddSpecialties = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useUser();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [specialtyForm] = Form.useForm();

  const handleOpen = () => {
    specialtyForm.resetFields();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addSpecialtyMutation = useMutation({
    mutationFn: async (values: UpsertSpecialty) => {
      try {
        const payload = {
          specialty: values.specialty,
        };
        const response = await addSpecialties(payload, token);
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
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Specialties
      </Button>{' '}
      <SpecialtyFormModal
        open={isOpen}
        onCancel={handleClose}
        title="Add Specialty"
        confirmLoading={addSpecialtyMutation.isPending}
        form={specialtyForm}
        onSubmit={addSpecialtyMutation.mutate}
        okText="Add"
      />
    </div>
  );
};

export default AddSpecialties;
