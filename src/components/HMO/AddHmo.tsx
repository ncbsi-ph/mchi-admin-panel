import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { addHmo, uploadImage } from '../../api';
import { handleError } from '../../helpers';
import HmoFormModal from './HmoFormModal';

const AddHmo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [hmoForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    hmoForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addHmoMutation = useMutation({
    mutationFn: async (values: AddHMO) => {
      try {
        const _fileList = new FormData();
        _fileList.append('file', fileList[0].originFileObj);
        const _uploadRes = await uploadImage(_fileList, 'hmo', token);

        const payload = {
          name: values.name,
          img: _uploadRes,
        };
        const response = await addHmo(payload, token);
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
      <Button type="primary" onClick={handleOpen}>
        Add HMO
      </Button>
      <HmoFormModal
        confirmLoading={addHmoMutation.isPending}
        fileList={fileList}
        form={hmoForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addHmoMutation.mutate}
        open={isOpen}
        title="Add Hmo"
        onChange={handleChange}
      />
    </div>
  );
};

export default AddHmo;
