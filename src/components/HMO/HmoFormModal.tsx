import { Form, FormInstance, Input, Modal } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import ImageUpload from '../ImageUpload';

interface HmoFormModalProps {
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

const HmoFormModal = ({
  open,
  title,
  onCancel,
  okText,
  form,
  onSubmit,
  confirmLoading,
  onChange,
  fileList,
}: HmoFormModalProps) => {
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
          label="Logo"
          fileList={fileList}
          onChange={onChange}
        />
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input a name',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HmoFormModal;
