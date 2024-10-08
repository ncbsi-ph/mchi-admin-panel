import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  App,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  UploadFile,
  UploadProps,
} from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { handleError, imagePlaceHolderFileList } from '../../helpers';
import { editInstitution, uploadImage } from '../../api';
import ImageUpload from '../ImageUpload';

const InstitutionModalForm = ({ data }: { data: Institution | undefined }) => {
  const [institutionForm] = Form.useForm();
  const [logoFileList, setLogoFileList] = useState<UploadFile[] | any>();
  const [isOpen, setIsOpen] = useState(false);
  const [logoWhiteFileList, setLogoWhiteFileList] = useState<
    UploadFile[] | any
  >();
  const [isLogoChange, setIsLogoChange] = useState(false);
  const [isLogoWhiteChange, setIsLogoWhiteChange] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useUser();
  const [bgFileList, setBgFileList] = useState<UploadFile[] | any>();
  const [isBgChange, setIsBgChange] = useState(false);

  const handleChangeLogo: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setLogoFileList(newFileList);
    setIsLogoChange(true);
  };
  const hanleChangeLogoWhite: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setLogoWhiteFileList(newFileList);

    setIsLogoWhiteChange(true);
  };

  const handleBg: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setBgFileList(newFileList);
    setIsBgChange(true);
  };

  const handleOpen = () => {
    const logoFile = imagePlaceHolderFileList(data!.logo);
    const logoWhiteFile = imagePlaceHolderFileList(data!.logo_white);
    const bgFile = imagePlaceHolderFileList(data!.hero_background);
    institutionForm.setFieldsValue({
      logo: logoFile,
      logo_white: logoWhiteFile,
      hero_background: bgFile,
      contact_no: data?.contact_no,
      address: data?.address,
      email_general_info: data?.email_general_info,
      email_careers: data?.email_careers,
      email_hmo_approval: data?.email_hmo_approval,
      email_appointment: data?.email_appointment,
    });
    setLogoFileList(logoFile);
    setLogoWhiteFileList(logoWhiteFile);
    setBgFileList(bgFile);
    setIsLogoChange(false);
    setIsLogoWhiteChange(false);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const saveChanges = useMutation({
    mutationFn: async (values: EditInstitution) => {
      try {
        setIsSubmitting(true);
        let _uploadLogoRes = '';
        let _uploadLogoWhiteRes = '';
        let _uploadBgRes = '';
        if (isLogoChange) {
          const _logoFileList = new FormData();
          _logoFileList.append('file', logoFileList[0].originFileObj);
          _uploadLogoRes = await uploadImage(
            _logoFileList,
            'institution',
            token
          );
        }
        if (isLogoWhiteChange) {
          const _logoWhiteFileList = new FormData();
          _logoWhiteFileList.append('file', logoWhiteFileList[0].originFileObj);
          _uploadLogoWhiteRes = await uploadImage(
            _logoWhiteFileList,
            'institution',
            token
          );
        }

        if (isBgChange) {
          const _bgFileList = new FormData();
          _bgFileList.append('file', bgFileList[0].originFileObj);
          _uploadBgRes = await uploadImage(_bgFileList, 'institution', token);
        }

        const payload = {
          id: data!.id,
          logo: isLogoChange ? _uploadLogoRes : data!.logo,
          logo_white: isLogoWhiteChange
            ? _uploadLogoWhiteRes
            : data!.logo_white,
          hero_background: isBgChange ? _uploadBgRes : data!.hero_background,
          prevLogo: isLogoChange ? data!.logo : null,
          prevLogo_white: isLogoWhiteChange ? data!.logo_white : null,
          prevHero_background: isBgChange ? data!.hero_background : null,
          contact_no: values.contact_no,
          address: values.address,
          email_general_info: values.email_general_info,
          email_careers: values.email_careers,
          email_hmo_approval: values.email_hmo_approval,
          email_appointment: values.email_appointment,
        };
        const response = await editInstitution(payload, token);
        message.success(response);
        setIsOpen(false);
      } catch (err: any) {
        handleError(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution'] });
    },
  });

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Edit Institutions
      </Button>
      <Modal
        open={isOpen}
        width={800}
        onOk={institutionForm.submit}
        okText="Save"
        confirmLoading={isSubmitting}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          className="max-w-[1000px] m-auto"
          form={institutionForm}
          onFinish={saveChanges.mutate}
        >
          <div className="flex gap-x-10">
            <ImageUpload
              name="logo"
              label="Logo"
              onChange={handleChangeLogo}
              fileList={logoFileList}
            />
            <ImageUpload
              name="logo_white"
              label="Logo White"
              onChange={hanleChangeLogoWhite}
              fileList={logoWhiteFileList}
            />
            <ImageUpload
              name="hero_background"
              label="Hero Background"
              onChange={handleBg}
              fileList={bgFileList}
            />
          </div>
          <div className="grow">
            <Form.Item
              name="contact_no"
              label="Contact no."
              rules={[
                {
                  required: true,
                  message: 'Contact number cannot be empty!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: 'Address cannot be empty!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Divider orientation="left">Emails</Divider>
          <Form.Item
            name="email_general_info"
            label="General Information"
            rules={[
              {
                required: true,
                message: 'General Info Email cannot be empty!',
              },
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email_careers"
            label="Careers"
            rules={[
              {
                required: true,
                message: 'Careers Email cannot be empty!',
              },
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email_hmo_approval"
            label="HMO Approval"
            rules={[
              {
                required: true,
                message: 'HMO Approval Email cannot be empty!',
              },
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email_appointment"
            label="Appointment"
            rules={[
              {
                required: true,
                message: 'Appointment Email cannot be empty!',
              },
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InstitutionModalForm;
