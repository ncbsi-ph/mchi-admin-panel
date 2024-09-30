import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { addNewsEvents, uploadImage } from '../../api';
import { handleError } from '../../helpers';
import NewsFormModal from './NewsFormModal';

const AddNewsEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [newsForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    newsForm.resetFields();
    setIsOpen(true);
    setFileList([]);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const addNewsEventsMutation = useMutation({
    mutationFn: async (values: AddNewsEvents) => {
      try {
        const _fileList = new FormData();
        _fileList.append('file', fileList[0].originFileObj);
        const _uploadRes = await uploadImage(_fileList, 'news-event', token);

        const payload = {
          title: values.title,
          description: values.description,
          type: values.type,
          img: _uploadRes,
        };

        const response = await addNewsEvents(payload, token);
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
      <Button type="primary" onClick={handleOpen}>
        Add News & Events
      </Button>
      <NewsFormModal
        confirmLoading={addNewsEventsMutation.isPending}
        fileList={fileList}
        form={newsForm}
        okText="Add"
        onCancel={handleClose}
        onSubmit={addNewsEventsMutation.mutate}
        open={isOpen}
        title="Add News & Events"
        onChange={handleChange}
      />
    </div>
  );
};

export default AddNewsEvents;
