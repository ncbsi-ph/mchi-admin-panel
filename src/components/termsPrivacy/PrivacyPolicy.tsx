import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { updatePrivacy } from '../../api';
import { handleError } from '../../helpers';
import Editor from '../Editor';

interface PrivacyPolicyProps {
  data: string;
}

const PrivacyPolicy = ({ data }: PrivacyPolicyProps) => {
  const [isDataSame, setIsDataSame] = useState(true);
  const [editorData, setEditorData] = useState(data);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { token } = useUser();

  const handleChange = (_: any, editor: ClassicEditor) => {
    const value = editor.getData();
    setEditorData(value);
    if (data === value) {
      setIsDataSame(true);
    } else {
      setIsDataSame(false);
    }
  };

  const mutatePrivacy = useMutation({
    mutationFn: async () => {
      try {
        const payload = {
          privacy_policy: editorData,
        };
        const response = await updatePrivacy(token, payload);
        message.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms-privacy'] });
      setIsDataSame(true);
    },
  });

  return (
    <div>
      {' '}
      <Editor data={data} onChange={handleChange} />
      <div className="grid place-content-end pt-5">
        <Button
          type="primary"
          disabled={isDataSame}
          loading={mutatePrivacy.isPending}
          onClick={() => mutatePrivacy.mutate()}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
