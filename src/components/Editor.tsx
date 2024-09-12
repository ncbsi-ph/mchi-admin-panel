import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { List } from '@ckeditor/ckeditor5-list';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  AutoImage,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageInsert,
} from '@ckeditor/ckeditor5-image';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { useUser } from '../store/store';

interface EditorProps {
  data?: string | undefined | null;
  onReady?: (editor: ClassicEditor) => void;
  onChange?: (_: any, editor: ClassicEditor) => void;
  wImage?: boolean;
}

const Editor = ({
  data = '',
  onReady,
  onChange,
  wImage = false,
}: EditorProps) => {
  const { token } = useUser();
  const wImageEditorConfiguration = {
    placeholder: 'Type here...',
    plugins: [
      Essentials,
      Bold,
      Italic,
      Paragraph,
      Heading,
      List,
      AutoLink,
      Link,
      BlockQuote,
      Alignment,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      LinkImage,
      AutoImage,
      ImageResizeEditing,
      ImageResizeHandles,
      ImageInsert,
      SimpleUploadAdapter,
    ],
    toolbar: [
      'undo',
      'redo',
      'heading',
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      'bold',
      'italic',
      'blockQuote',
      'link',
      'bulletedList',
      'numberedList',
      'insertImage',
    ],
    image: {
      toolbar: [
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'linkImage',
      ],
    },
    simpleUpload: {
      uploadUrl: `${import.meta.env.VITE_BASE_URL}/admin/gallery/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const editorConfiguration = {
    placeholder: 'Type here...',
    plugins: [
      Essentials,
      Bold,
      Italic,
      Alignment,
      Paragraph,
      Heading,
      List,
      AutoLink,
      Link,
      BlockQuote,
    ],
    toolbar: [
      'undo',
      'redo',
      'heading',
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      'bold',
      'italic',
      'blockQuote',
      'link',
      'bulletedList',
      'numberedList',
    ],
  };

  const _config = wImage ? wImageEditorConfiguration : editorConfiguration;
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={_config}
        data={data}
        onReady={onReady}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
