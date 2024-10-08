import { Form, FormInstance, Input, Modal, Select } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import useSpecialties from '../hooks/useSpecialties';
import ImageUpload from '../ImageUpload';

interface DoctorModalFormProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  okText: string;
  form: FormInstance;
  onSubmit: (values: any) => void;
  onChange?: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
  confirmLoading: boolean;
  fileList: UploadFile[] | any;
  onRemoveImg?: () => void;
  isImgRequired?: boolean;
}

const DoctorModalForm = ({
  open,
  title,
  onCancel,
  okText,
  form,
  onSubmit,
  confirmLoading,
  onChange,
  fileList,
  isImgRequired = false,
  onRemoveImg = () => true,
}: DoctorModalFormProps) => {
  const { isLoading, error, data } = useSpecialties();

  if (error) {
    return <p>{` "An error has occurred : " ${error}`}</p>;
  }

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
          label={`Image ${isImgRequired ? '' : '(Optional)'}`}
          onChange={onChange}
          fileList={fileList}
          isImgRequired={isImgRequired}
          onRemoveImg={onRemoveImg}
        />
        <div className="grid gap-x-5 grid-cols-2">
          <Form.Item
            name="fname"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please input a first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="mname" label="Middle Name (optional)">
            <Input />
          </Form.Item>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input a last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="schedule" label="Schedule (optional)">
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact no." className="col-span-2">
            <Input />
          </Form.Item>
          <Form.Item
            name="specialties"
            label="Specialization/s"
            className="col-span-2"
          >
            <Select
              options={data}
              mode="multiple"
              allowClear
              loading={isLoading}
              style={{ width: '100%' }}
              placeholder="Select one or more specialty"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DoctorModalForm;
