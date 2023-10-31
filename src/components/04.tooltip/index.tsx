import { Tooltip, TooltipProps } from 'antd';
import { ReactComponent as TooltipIcon } from 'src/assets/icons/tooltip-icon.svg';
import './styles.scss';

type OtoriTooltipProps = TooltipProps & {
  children?: any;
};

const OtoriTooltip: React.FC<OtoriTooltipProps> = (props) => {
  const { children, overlayClassName, ...other } = props;

  return (
    <Tooltip {...other} overlayClassName={`${overlayClassName ?? 'otori-tooltip-overlay'}`}>
      <TooltipIcon className="otori-tooltip-icon" />
    </Tooltip>
  );
};

export default OtoriTooltip;
