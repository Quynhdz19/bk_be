import { Select, SelectProps } from 'antd';
import { useRef, useState } from 'react';
import './styles.scss';

export type option = { value: string | number; label: string };

const { Option } = Select;

interface IOtoriSelect extends SelectProps {
  zindexicon?: number;
}

const OtoriSelect: React.FC<IOtoriSelect> = (props: IOtoriSelect) => {
  const { options = [], className } = props;

  const [, setIsFocus] = useState<any>(false);

  const ref = useRef<any>(null);

  const handleFocus = (e: any) => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleSelect = () => {
    ref.current?.blur();
    handleBlur();
  };

  return (
    <Select
      {...props}
      onFocus={handleFocus}
      ref={ref}
      onSelect={handleSelect}
      onBlur={handleBlur}
      className={className ? className : 'otori-select'}
    >
      {options?.map((option: any, index: number) => (
        <Option key={index} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default OtoriSelect;
