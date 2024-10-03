import { Form, FormInstance, Input, InputNumber, Modal, Switch } from 'antd';
import Editor from '../Editor';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import TextArea from 'antd/es/input/TextArea';

interface CareersModalFormProps {
  form: FormInstance;
  open: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  title: string;
  okText: string;
  qualifications: string;
  handleQualificationChange: (e: any, editor: ClassicEditor) => void;
  confirmLoading: boolean;
}

const CareersModalForm = ({
  open,
  form,
  onSubmit,
  onCancel,
  qualifications,
  handleQualificationChange,
  title,
  okText,
  confirmLoading,
}: CareersModalFormProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      width={720}
      onOk={form.submit}
      okText={okText}
      cancelText="Cancel"
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <div className="flex gap-x-5">
          <Form.Item label="Enable" name="is_enabled" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
            className="grow"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Slots" name="slots" initialValue={1}>
          <InputNumber min={1} />
        </Form.Item>
        <div className="flex gap-x-2">
          <Form.Item
            label="Qualifications"
            name="qualifications"
            className="grow"
            rules={[
              { required: true },
              {
                validator() {
                  if (
                    qualifications.length < 1 ||
                    qualifications === undefined
                  ) {
                    return Promise.reject(
                      new Error('Please add a Qualifications')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Editor
              data={qualifications}
              wImage={true}
              onChange={handleQualificationChange}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Salary Range"
          name="salary_range"
          rules={[{ required: true, message: 'Please input a salary range!' }]}
          className="grow"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Job Requirement/s"
          name="job_type"
          rules={[{ required: true, message: 'Please fill this entry!' }]}
          className="grow"
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Job Descriptions"
          name="job_summary"
          className="grow"
          rules={[
            { required: true, message: 'Please input Job Descriptions!' },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CareersModalForm;
