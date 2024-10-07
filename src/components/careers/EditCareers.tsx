import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { editCareers } from '../../api';
import { EditBtn, handleError } from '../../helpers';
import CareersModalForm from './CareersModalForm';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

interface editCareersProps {
  data: Careers;
}

const EditCareers = ({ data }: editCareersProps) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [qualifications, setQualifications] = useState('');
  const { token } = useUser();

  const handleOpen = () => {
    setOpen(true);
    form.setFieldsValue({
      title: data.title,
      slots: data.slots,
      salary_range: data.salary_range,
      job_type: data.job_type,
      date_posted: data.date_posted,
      date_modified: data.date_modified,
      job_summary: data.job_summary,
      is_enabled: data.is_enabled,
    });
    setQualifications(data.qualifications);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditorChange = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setQualifications(value);
  };

  const editCareersMutation = useMutation({
    mutationFn: async (values: UpsertCareers) => {
      try {
        const payload = {
          title: values.title,
          slots: values.slots,
          salary_range: data.salary_range,
          job_type: data.job_type,
          date_posted: data.date_posted,
          date_modified: data.date_modified,
          job_summary: data.job_summary,
          qualifications: qualifications,
          is_enabled: data.is_enabled,
        };
        const response = await editCareers(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      setOpen(false);
    },
  });
  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <CareersModalForm
        title="Edit Career"
        okText="Edit"
        form={form}
        open={open}
        onSubmit={editCareersMutation.mutate}
        onCancel={handleCancel}
        handleQualificationChange={handleEditorChange}
        qualifications={qualifications}
        confirmLoading={editCareersMutation.isPending}
      />
    </div>
  );
};

export default EditCareers;
