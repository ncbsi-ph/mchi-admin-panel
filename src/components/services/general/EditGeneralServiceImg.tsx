import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import {
  EditBtn,
  handleError,
  imagePlaceHolderFileList,
} from '../../../helpers';
import { editGeneralServiceImg, uploadImage } from '../../../api';
import ServiceImgFormModal from '../ServiceImgFormModal';

const EditGeneralServiceImg = ({ data }: { data: ServicesImg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [isLogoChange, setIsLogoChange] = useState(false);
  const [imgForm] = Form.useForm();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    const logoFile = imagePlaceHolderFileList(data.img);
    setIsOpen(true);
    setIsLogoChange(false);
    setFileList(logoFile);
    imgForm.setFieldsValue({
      img: logoFile,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setIsLogoChange(true);
  };

  const editImgMutation = useMutation({
    mutationFn: async () => {
      try {
        let _uploadRes: string = '';

        if (isLogoChange && fileList.length !== 0) {
          const _fileList = new FormData();
          _fileList.append('file', fileList[0].originFileObj);
          _uploadRes = await uploadImage(_fileList, 'services/img', token);
        }
        const payload: EditServicesImg = {
          img: isLogoChange && fileList.length !== 0 ? _uploadRes : data.img,
          prevImg: isLogoChange && fileList.length !== 0 ? data.img : null,
        };
        const response = await editGeneralServiceImg(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['general-img'] });
    },
  });

  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <ServiceImgFormModal
        confirmLoading={editImgMutation.isPending}
        onChange={handleChange}
        fileList={fileList}
        form={imgForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editImgMutation.mutate}
        open={isOpen}
        title="Edit Service Images"
      />
    </div>
  );
};

export default EditGeneralServiceImg;
