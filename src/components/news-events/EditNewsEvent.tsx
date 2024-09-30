import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { EditBtn, handleError, imagePlaceHolderFileList } from '../../helpers';
import { editNewsEvents, uploadImage } from '../../api';
import NewsFormModal from './NewsFormModal';

interface EditNewsEventProps {
  data: NewsEvents;
}
const EditNewsEvent = ({ data }: EditNewsEventProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [isImgChange, setIsImgChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [newsNEventsForm] = Form.useForm();
  const { token } = useUser();

  const handleOpen = () => {
    const file = imagePlaceHolderFileList(data.img);
    setFileList(file);
    newsNEventsForm.setFieldsValue({
      title: data.title,
      description: data.description,
      img: file,
      type: data.type,
    });
    setIsOpen(true);
    setIsImgChange(false);
  };

  const handleCancel = () => setIsOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setIsImgChange(true);
  };

  const EditNewsEventMutation = useMutation({
    mutationFn: async (values: any) => {
      try {
        let _uploadRes = '';
        if (isImgChange) {
          const _fileList = new FormData();
          _fileList.append('file', fileList[0].originFileObj);
          _uploadRes = await uploadImage(_fileList, 'news-event', token);
        }
        const payload: EditNewsEvents = {
          title: values.title,
          description: values.title,
          type: values.type,
          img: _uploadRes,
          prevImg: isImgChange ? data.img : null,
        };
        const response = await editNewsEvents(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-events'] });
    },
  });
  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <NewsFormModal
        open={isOpen}
        title="Edit News & Events"
        onCancel={handleCancel}
        okText="Save"
        confirmLoading={EditNewsEventMutation.isPending}
        form={newsNEventsForm}
        onSubmit={EditNewsEventMutation.mutate}
        fileList={fileList}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditNewsEvent;
