import { Form, FormInstance, Input, Modal } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import ImageUpload from '../../ImageUpload';
import TextArea from 'antd/es/input/TextArea';

interface FeaturedServicesFormModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  okText: string;
  form: FormInstance;
  onSubmit: (values: any) => void;
  onChange?: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
  confirmLoading: boolean;
  fileList: UploadFile[] | any;
}
const FeaturedServicesFormModal = ({
  open,
  title,
  onCancel,
  okText,
  form,
  onSubmit,
  confirmLoading,
  onChange,
  fileList,
}: FeaturedServicesFormModalProps) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      width={700}
      closable={false}
      maskClosable={false}
      okText={okText}
      onOk={form.submit}
      forceRender
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <ImageUpload
          name="img"
          label="Image"
          fileList={fileList}
          onChange={onChange}
        />
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
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input a description',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeaturedServicesFormModal;
