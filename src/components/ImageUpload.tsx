import { Form } from 'antd';
import Upload, { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { MdUpload } from 'react-icons/md';

interface ImageUploadProps {
  onChange?: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
  fileList?: UploadFile[] | any;
  name: string;
  label: string;
  isImgRequired?: boolean;
  onRemoveImg?: () => void;
}
const acceptedFormats = ['image/png', 'image/jpeg', 'image/svg+xml'];

const retrieveThumbFile = (e: any) => {
  return e && e.fileList;
};
const ImageUpload = ({
  onChange,
  fileList,
  name,
  label,
  isImgRequired = true,
  onRemoveImg = () => true,
}: ImageUploadProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: isImgRequired, message: `Please Add a ${label}!` },
        {
          validator(_, value) {
            if (value && value?.length != 0 && value[0]?.size) {
              if (value[0]?.size / 1024 / 1024 <= 2) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('File size too large. Max 2 MB'));
            }
            return Promise.resolve();
          },
        },
      ]}
      valuePropName="fileList"
      getValueFromEvent={retrieveThumbFile}
    >
      <Upload
        accept={acceptedFormats.join()}
        showUploadList={{
          showDownloadIcon: false,
          showPreviewIcon: false,
          showRemoveIcon: true,
        }}
        name="avatar"
        listType="picture-card"
        beforeUpload={() => false}
        onRemove={onRemoveImg}
        onChange={onChange}
      >
        {fileList?.length ? null : (
          <div>
            <MdUpload className="text-2xl" /> <div>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

export default ImageUpload;
