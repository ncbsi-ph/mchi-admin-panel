import { Form, FormInstance, Input, Modal } from 'antd';

interface SpecialtyFormModalTypes {
  open: boolean;
  onCancel: () => void;
  title: string;
  form: FormInstance;
  confirmLoading: boolean;
  onSubmit: (values: any) => void;
  okText: string;
}
const SpecialtyFormModal = ({
  open,
  onCancel,
  title,
  form,
  confirmLoading,
  onSubmit,
  okText,
}: SpecialtyFormModalTypes) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      title={title}
      onOk={form.submit}
      confirmLoading={confirmLoading}
      okText={okText}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          name="specialty"
          label="Specialty"
          rules={[{ required: true, message: 'Please input a specialty name' }]}
        >
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SpecialtyFormModal;
