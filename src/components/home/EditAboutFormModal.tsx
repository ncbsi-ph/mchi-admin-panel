import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editHomeAbout } from '../../api';
import { EditBtn, handleError } from '../../helpers';
import Editor from '../Editor';

const EditAboutFormModal = ({ data }: { data: HomeAbout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutForm] = Form.useForm();
  const queryClient = useQueryClient();
  const [editorData, setEditorData] = useState('');
  const { message } = App.useApp();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    setEditorData(data.description);
    aboutForm.setFieldsValue({
      title: data.title,
      sub_title: data.sub_title,
      description: data.description,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleEditorChange = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setEditorData(value);
  };

  const editHomeAboutMutation = useMutation({
    mutationFn: async (values: EditHomeAbout) => {
      try {
        const payload = {
          title: values.title,
          sub_title: values.sub_title,
          description: editorData,
        };
        const response = await editHomeAbout(payload, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-about'] });
    },
  });

  return (
    <div>
      <EditBtn onClick={handleOpen} />
      <Modal
        title="About"
        open={isOpen}
        onCancel={handleCancel}
        width={700}
        closable={false}
        maskClosable={false}
        okText="Save"
        onOk={aboutForm.submit}
        confirmLoading={editHomeAboutMutation.isPending}
      >
        <Form
          layout="vertical"
          form={aboutForm}
          onFinish={editHomeAboutMutation.mutate}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input a title',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sub_title"
            label="Sub Title"
            rules={[
              {
                required: true,
                message: 'Please input a sub title',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
              {
                validator() {
                  if (editorData.length < 1 || editorData === undefined) {
                    return Promise.reject(new Error('Please add description!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Editor data={editorData} onChange={handleEditorChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAboutFormModal;
