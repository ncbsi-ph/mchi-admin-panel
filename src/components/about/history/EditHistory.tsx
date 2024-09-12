import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, Modal } from 'antd';
import { useState } from 'react';
import { useUser } from '../../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editHistory } from '../../../api';
import { handleError } from '../../../helpers';
import Editor from '../../Editor';

const EditHistory = ({ data }: { data: History }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editorData, setEditorData] = useState('');
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [historyForm] = Form.useForm();
  const { token } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
    setEditorData(data.history);
  };

  const handleCancel = () => setIsOpen(false);

  const handleEditorChange = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setEditorData(value);
  };

  const editHistoryMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await editHistory(editorData, data.id, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        title="History"
        open={isOpen}
        onCancel={handleCancel}
        width={800}
        closable={false}
        maskClosable={false}
        okText="Save"
        onOk={historyForm.submit}
        confirmLoading={editHistoryMutation.isPending}
      >
        <Form onFinish={editHistoryMutation.mutate} form={historyForm}>
          <Form.Item
            name="editor"
            required
            rules={[
              {
                validator() {
                  if (editorData.length < 1 || editorData === undefined) {
                    return Promise.reject(new Error("History can't be empty"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Editor
              data={editorData}
              wImage={true}
              onChange={handleEditorChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditHistory;
