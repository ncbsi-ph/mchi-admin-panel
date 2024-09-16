import { message, Tooltip } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

export const cookieLog = 'mchi_user_presence';

export const handleError = (err: any) => {
  if (err.response) {
    const dataMessage = err.response?.data;
    if (dataMessage === '') {
      message.error(err.response.statusText);
    } else {
      message.error(err.response?.data);
    }
  } else {
    message.error(err.message);
  }
  console.log(err);
};
interface BtnProps {
  onClick?: () => void;
}
export const EditBtn = ({ onClick }: BtnProps) => (
  <button className="btn hover:text-primary" onClick={onClick}>
    <Tooltip>
      <div>
        <BiEdit className="text-2xl" />
      </div>
    </Tooltip>
  </button>
);
export const DeleteButton = ({ onClick }: BtnProps) => (
  <button className="btn hover:text-red-600" onClick={onClick}>
    <Tooltip title="Delete">
      <div>
        <RiDeleteBinLine className="text-2xl" />
      </div>
    </Tooltip>
  </button>
);

export const imagePlaceHolderFileList = (img: string) => [
  {
    uid: uuidv4(),
    name: img.substring(img.lastIndexOf('/') + 1),
    status: 'done',
    url: img,
    thumbUrl: img,
  },
];

export const DATE_FORMAT = 'MM/DD/YYYY';
