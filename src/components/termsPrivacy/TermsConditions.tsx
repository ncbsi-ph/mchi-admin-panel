import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button } from 'antd';
import { useState } from 'react';
import { useUser } from '../../store/store';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { updateTerms } from '../../api';
import { handleError } from '../../helpers';
import Editor from '../Editor';

interface TermsConditionsProps {
  data: string;
}

const TermsConditions = ({ data }: TermsConditionsProps) => {
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

  const mutateTerms = useMutation({
    mutationFn: async () => {
      try {
        const payload = {
          terms_and_conditions: editorData,
        };
        const response = await updateTerms(token, payload);
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
      <Editor data={editorData} onChange={handleChange} />
      <div className="grid place-content-end pt-5">
        <Button
          type="primary"
          disabled={isDataSame}
          loading={mutateTerms.isPending}
          onClick={() => mutateTerms.mutate()}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default TermsConditions;
