import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { EditBtn, handleError, imagePlaceHolderFileList } from '../../helpers';
import { editHmo, uploadImage } from '../../api';
import HmoFormModal from './HmoFormModal';

const EditHmo = ({ data }: { data: HMO }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [isLogoChange, setIsLogoChange] = useState(false);
  const [hmoForm] = Form.useForm();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    const logoFile = imagePlaceHolderFileList(data.img);
    setIsOpen(true);
    setIsLogoChange(false);
    setFileList(logoFile);
    hmoForm.setFieldsValue({
      name: data.name,
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

  const editHmoMutation = useMutation({
    mutationFn: async (values: EditHMO) => {
      try {
        let _uploadRes: string = '';

        if (isLogoChange && fileList.length !== 0) {
          const _fileList = new FormData();
          _fileList.append('file', fileList[0].originFileObj);
          _uploadRes = await uploadImage(_fileList, 'hmo', token);
        }
        const payload = {
          name: values.name,
          img: isLogoChange && fileList.length !== 0 ? _uploadRes : data.img,
          prevImg: isLogoChange && fileList.length !== 0 ? data.img : null,
        };
        const response = await editHmo(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hmo'] });
    },
  });

  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <HmoFormModal
        confirmLoading={editHmoMutation.isPending}
        onChange={handleChange}
        fileList={fileList}
        form={hmoForm}
        okText="Save"
        onCancel={handleClose}
        onSubmit={editHmoMutation.mutate}
        open={isOpen}
        title="Edit Hmo"
      />
    </div>
  );
};

export default EditHmo;
