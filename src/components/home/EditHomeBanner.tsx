import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { EditBtn, handleError, imagePlaceHolderFileList } from '../../helpers';
import { editHomeBanner, uploadImage } from '../../api';
import HomeBannerFormModal from './HomeBannerFormModal';

const EditHomeBanner = ({ data }: { data: HomeBannerType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [isImgChange, setIsImgChange] = useState(false);
  const [bannerForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    const file = imagePlaceHolderFileList(data.img);
    setFileList(file);
    bannerForm.setFieldsValue({
      header: data.header,
      sub_header: data.sub_header,
      link: data.link,
      img: file,
    });
    setIsOpen(true);
    setIsImgChange(false);
  };

  const handleCancel = () => setIsOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setIsImgChange(true);
  };

  const editHomeBannerMutation = useMutation({
    mutationFn: async (values: EditHomeBanner) => {
      try {
        let _uploadRes: string = '';
        if (isImgChange && fileList.length !== 0) {
          const _fileList = new FormData();
          _fileList.append('file', fileList[0].originFileObj);
          _uploadRes = await uploadImage(_fileList, 'banner', token);
        }
        const payload = {
          header: values.header,
          sub_header: values.sub_header,
          link: values.link,
          img:
            isImgChange && fileList.length !== 0
              ? _uploadRes
              : isImgChange
              ? null
              : data.img,
          prevImg:
            isImgChange && fileList.length !== 0
              ? null
              : isImgChange
              ? data.img
              : null,
        };
        const response = await editHomeBanner(payload, data.id, token);
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
      <EditBtn onClick={handleOpen} />
      <HomeBannerFormModal
        title="Edit Banner"
        open={isOpen}
        onCancel={handleCancel}
        okText="Save"
        form={bannerForm}
        onSubmit={editHomeBannerMutation.mutate}
        confirmLoading={editHomeBannerMutation.isPending}
        onChange={handleChange}
        fileList={fileList}
      />
    </div>
  );
};

export default EditHomeBanner;
