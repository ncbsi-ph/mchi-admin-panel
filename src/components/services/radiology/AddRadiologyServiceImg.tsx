import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { addRadiologyServiceImg, uploadImage } from '../../../api';
import { handleError } from '../../../helpers';
import ServiceImgFormModal from '../ServiceImgFormModal';

const AddRadiologyServiceImg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [imgForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    imgForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addRadiologyImgMutation = useMutation({
    mutationFn: async () => {
      try {
        const _fileList = new FormData();
        _fileList.append('file', fileList[0].originFileObj);
        const _uploadRes = await uploadImage(_fileList, 'services/img', token);

        const payload: AddServicesImg = {
          img: _uploadRes,
        };
        const response = await addRadiologyServiceImg(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['radiology-img'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Radiology Service Image
      </Button>
      <ServiceImgFormModal
        confirmLoading={addRadiologyImgMutation.isPending}
        fileList={fileList}
        form={imgForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addRadiologyImgMutation.mutate}
        open={isOpen}
        title="Add Radiology Service Image"
        onChange={handleChange}
      />
    </div>
  );
};

export default AddRadiologyServiceImg;
