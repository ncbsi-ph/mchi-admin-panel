import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { addHomeBanner, uploadImage } from '../../api';
import { handleError } from '../../helpers';
import HomeBannerFormModal from './HomeBannerFormModal';

const AddHomeBanner = ({ dataLength }: { dataLength?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [bannerForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    bannerForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleCancel = () => setIsOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addHomeBannerMutation = useMutation({
    mutationFn: async (values: AddHomeBanner) => {
      try {
        const _fileList = new FormData();
        _fileList.append('file', fileList[0].originFileObj);
        const _uploadRes = await uploadImage(_fileList, 'banner', token);
        const payload = {
          header: values.header,
          sub_header: values.sub_header,
          img: _uploadRes,
          link: values.link,
          position: dataLength ? dataLength : 0,
        };
        const response = await addHomeBanner(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-banner'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Banner
      </Button>
      <HomeBannerFormModal
        title="Add Banner"
        open={isOpen}
        onCancel={handleCancel}
        okText="Add"
        form={bannerForm}
        onSubmit={addHomeBannerMutation.mutate}
        confirmLoading={addHomeBannerMutation.isPending}
        fileList={fileList}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddHomeBanner;
