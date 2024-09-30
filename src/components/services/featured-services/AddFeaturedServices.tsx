import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { addFeaturedServices, uploadImage } from '../../../api';
import { handleError } from '../../../helpers';
import FeaturedServicesFormModal from './FeaturedServicesFormModal';

const AddFeaturedServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [serviceForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    serviceForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addServiceMutation = useMutation({
    mutationFn: async (values: AddFeaturedService) => {
      try {
        const _fileList = new FormData();
        _fileList.append('file', fileList[0].originFileObj);
        const _uploadRes = await uploadImage(_fileList, 'services/img', token);

        const payload = {
          title: values.title,
          description: values.description,
          img: _uploadRes,
        };
        const response = await addFeaturedServices(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured-services'] });
    },
  });
  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Featured Service
      </Button>
      <FeaturedServicesFormModal
        confirmLoading={addServiceMutation.isPending}
        fileList={fileList}
        form={serviceForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addServiceMutation.mutate}
        open={isOpen}
        title="Add Featured Service"
        onChange={handleChange}
      />
    </div>
  );
};

export default AddFeaturedServices;
