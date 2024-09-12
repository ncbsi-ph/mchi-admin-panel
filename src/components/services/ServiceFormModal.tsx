import { Form, FormInstance, Input, Modal } from 'antd';

interface ServiceFormModalProps {
  open: boolean;
  title: string;
  okText: string;
  form: FormInstance;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  confirmLoading: boolean;
}

const ServiceFormModal = ({
  open,
  title,
  okText,
  form,
  onCancel,
  onSubmit,
  confirmLoading,
}: ServiceFormModalProps) => {
  return (
    <Modal
      closable={false}
      maskClosable={false}
      open={open}
      confirmLoading={confirmLoading}
      forceRender
      okText={okText}
      onCancel={onCancel}
      onOk={form.submit}
      title={title}
      width={700}
    >
      <Form layout="vertical" onFinish={onSubmit} form={form}>
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
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceFormModal;
