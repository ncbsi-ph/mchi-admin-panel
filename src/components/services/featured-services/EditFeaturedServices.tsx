import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  EditBtn,
  handleError,
  imagePlaceHolderFileList,
} from '../../../helpers';
import { editFeaturedServices, uploadImage } from '../../../api';
import FeaturedServicesFormModal from './FeaturedServicesFormModal';

const EditFeaturedServices = ({ data }: { data: FeaturedService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [featuredServiceForm] = Form.useForm();
  const [isImgChange, setIsImgChange] = useState(false);
  const [imgFileList, setImgFileList] = useState<UploadFile[] | any>();
  const { token } = useUser();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    const imgFile = imagePlaceHolderFileList(data.img);
    setIsOpen(true);
    setIsImgChange(false);
    setImgFileList(imgFile);
    featuredServiceForm.setFieldsValue({
      title: data.title,
      img: imgFile,
      description: data.description,
    });
  };

  const handleCancel = () => setIsOpen(false);

  const handleImgChange: UploadProps['onChange'] = ({
    fileList: imgNewFileList,
  }) => {
    setImgFileList(imgNewFileList);
    setIsImgChange(true);
  };

  const editFeaturedServiceMutation = useMutation({
    mutationFn: async (values: EditFeaturedService) => {
      try {
        let _imgUploadRes: string = '';

        if (isImgChange) {
          const _imgFileList = new FormData();
          _imgFileList.append('file', imgFileList[0].originFileObj);
          _imgUploadRes = await uploadImage(
            _imgFileList,
            'services/img',
            token
          );
        }
        const payload = {
          title: values.title,
          description: values.description,
          img: isImgChange ? _imgUploadRes : data.img,
          prevImg: isImgChange ? data.img : null,
        };
        const response = await editFeaturedServices(payload, data.id, token);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured-services'] });
      setIsOpen(false);
    },
  });
  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <FeaturedServicesFormModal
        confirmLoading={editFeaturedServiceMutation.isPending}
        form={featuredServiceForm}
        fileList={imgFileList}
        okText="Edit"
        onCancel={handleCancel}
        onSubmit={editFeaturedServiceMutation.mutate}
        open={isOpen}
        title={`Edit ${data.title}`}
        onChange={handleImgChange}
      />
    </div>
  );
};

export default EditFeaturedServices;
