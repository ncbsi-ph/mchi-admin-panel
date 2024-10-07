import { Dropdown, MenuProps } from 'antd';
import ChangeEmail from './ChangeEmail';
import ChangePass from './ChangePass';
import { MdSettings } from 'react-icons/md';

interface ActionsProps {
  data: Doctor;
}

const Actions = ({ data }: ActionsProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <ChangeEmail data={data} />,
    },
    {
      key: '2',
      label: <ChangePass data={data} />,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a className="text-base" onClick={(e) => e.preventDefault()}>
        <MdSettings />
      </a>
    </Dropdown>
  );
};

export default Actions;
