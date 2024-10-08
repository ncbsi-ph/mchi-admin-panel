import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { EditBtn, handleError, imagePlaceHolderFileList } from '../../helpers';
import { editDoctors, uploadImage } from '../../api';
import DoctorModalForm from './DoctorModalForm';

const EditDoctor = ({ data }: { data: Doctors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImgChange, setIsImgChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [doctorForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    const file = imagePlaceHolderFileList(data.img);
    setFileList(file);
    doctorForm.setFieldsValue({
      fname: data.fname,
      mname: data.mname,
      lname: data.lname,
      schedule: data.schedule,
      contact: data.contact,
      img: file,
      specialties: data.specialty.map((item) => item.specialty),
    });
    setIsOpen(true);
    setIsImgChange(false);
  };

  const handleCancel = () => setIsOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setIsImgChange(true);
  };

  const editDoctorMutation = useMutation({
    mutationFn: async (values: EditDoctors) => {
      try {
        let _uploadRes: string = '';
        if (isImgChange) {
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
          img: isImgChange ? _uploadRes : data.img,
          prevImg: isImgChange ? null : isImgChange ? data.img : null,
          specialties:
            values.specialties === undefined ? [] : values.specialties,
        };
        const response = await editDoctors(payload, data.id, token);
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
      <EditBtn onClick={handleOpen} />
      <DoctorModalForm
        title={`Edit Doctor '${data.lname} ${data.fname}'`}
        open={isOpen}
        onCancel={handleCancel}
        okText="Save"
        form={doctorForm}
        onSubmit={editDoctorMutation.mutate}
        confirmLoading={editDoctorMutation.isPending}
        fileList={fileList}
        onChange={handleChange}
        isImgRequired={true}
      />
    </div>
  );
};

export default EditDoctor;
