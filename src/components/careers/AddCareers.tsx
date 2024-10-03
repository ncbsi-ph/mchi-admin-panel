import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { addCareers } from '../../api';
import { handleError } from '../../helpers';
import CareersModalForm from './CareersModalForm';

const AddCareers = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { token } = useUser();
  const [qualifications, setQualifications] = useState('');

  const handleOpen = () => {
    setOpen(true);
    form.resetFields();
    setQualifications('');
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleQualifications = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setQualifications(value);
  };

  const addCareersMutation = useMutation({
    mutationFn: async (values: UpsertCareers) => {
      try {
        const payload = {
          title: values.title,
          job_summary: values.job_summary,
          is_enabled: values.is_enabled,
          job_type: values.job_type,
          qualifications: qualifications,
          salary_range: values.salary_range,
          slots: values.slots,
        };
        const response = await addCareers(payload, token);
        message.success(response);
        setOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
    },
  });
  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Careers
      </Button>
      <CareersModalForm
        title="Add Careers"
        open={open}
        onCancel={handleCancel}
        okText="Save"
        form={form}
        onSubmit={addCareersMutation.mutate}
        qualifications={qualifications}
        confirmLoading={addCareersMutation.isPending}
        handleQualificationChange={handleQualifications}
      />
    </div>
  );
};

export default AddCareers;
