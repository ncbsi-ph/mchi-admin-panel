import { Input } from 'antd';
import { BsSearch } from 'react-icons/bs';

interface SearchFilterProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const SearchFilter = ({ onSearch, placeHolder }: SearchFilterProps) => {
  return (
    <div className="grid justify-end mb-3">
      <Input
        prefix={<BsSearch className="text-slate-400 mr-1" />}
        placeholder={placeHolder}
        onChange={onSearch}
        className="w-96"
        allowClear
      />
    </div>
  );
};

export default SearchFilter;
