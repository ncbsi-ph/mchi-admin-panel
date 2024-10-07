import { Dropdown, MenuProps } from 'antd';
import ChangeEmailAdd from './ChangeEmailAdd';
import ChangePassword from './ChangePassword';
import { MdSettings } from 'react-icons/md';

interface ActionsType {
  data: Patient;
}

const Actions = ({ data }: ActionsType) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <ChangeEmailAdd data={data} />,
    },
    {
      key: '2',
      label: <ChangePassword data={data} />,
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
