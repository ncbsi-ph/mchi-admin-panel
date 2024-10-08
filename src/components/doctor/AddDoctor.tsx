import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoctors, uploadImage } from '../../api';
import { handleError } from '../../helpers';
import DoctorModalForm from './DoctorModalForm';

const AddDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const { token } = useUser();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    doctorForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleCancel = () => setIsOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addDoctorsMutation = useMutation({
    mutationFn: async (values: AddDoctors) => {
      try {
        let _uploadRes: string = '';
        if (fileList.length !== 0) {
          const _fileList = new FormData();
          _fileList.append('file', fileList[0].originFileObj);
          _uploadRes = await uploadImage(_fileList, 'doctor', token);
        }
        const payload = {
          fname: values.fname,
          mname: values.mname === undefined ? null : values.mname,
          lname: values.lname,
          schedule: values.schedule === undefined ? null : values.schedule,
          contact: values.contact,
          img: fileList.length !== 0 ? _uploadRes : null,
          specialties:
            values.specialties === undefined ? [] : values.specialties,
        };
        const response = await addDoctors(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Doctor
      </Button>
      <DoctorModalForm
        title="Add Doctors"
        open={isOpen}
        onCancel={handleCancel}
        okText="Add"
        form={doctorForm}
        onSubmit={addDoctorsMutation.mutate}
        confirmLoading={addDoctorsMutation.isPending}
        fileList={fileList}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddDoctor;
