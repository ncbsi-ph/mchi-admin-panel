import { Form, FormInstance, Modal } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import ImageUpload from '../ImageUpload';

interface ServiceImgFormModalProps {
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

const ServiceImgFormModal = ({
  open,
  title,
  onCancel,
  okText,
  form,
  onSubmit,
  confirmLoading,
  onChange,
  fileList,
}: ServiceImgFormModalProps) => {
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
      </Form>
    </Modal>
  );
};

export default ServiceImgFormModal;
