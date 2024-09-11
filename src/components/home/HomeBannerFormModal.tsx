import { Form, FormInstance, Input, Modal } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import ImageUpload from '../ImageUpload';

interface HomeBannerFormModalProps {
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

const HomeBannerFormModal = ({
  open,
  title,
  onCancel,
  okText,
  form,
  onSubmit,
  confirmLoading,
  onChange,
  fileList,
}: HomeBannerFormModalProps) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      width={500}
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
          onChange={onChange}
          fileList={fileList}
        />
        <Form.Item name="header" label="Header">
          <Input />
        </Form.Item>
        <Form.Item name="sub_header" label="Sub Header">
          <Input />
        </Form.Item>
        <Form.Item name="link" label="Link">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HomeBannerFormModal;
