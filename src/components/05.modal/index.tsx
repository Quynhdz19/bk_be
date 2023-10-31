import { Modal, ModalProps } from 'antd';
import { DEFAULT_MODAL_WIDTH } from 'src/constants';
import { CloseModalIcon } from 'src/assets/icons';
import './styles.scss';

interface IModalProps extends ModalProps {
  children?: any;
}

const OtoriModal: React.FC<IModalProps> = (props: IModalProps) => {
  const { children, footer, width, className } = props;
  return (
    <Modal
      {...props}
      width={width ? width : DEFAULT_MODAL_WIDTH}
      footer={footer ? footer : null}
      destroyOnClose={true}
      className={`otori-modal ${className} `}
      closeIcon={<img src={CloseModalIcon} alt="close-icon" />}
    >
      {children}
    </Modal>
  );
};

export default OtoriModal;
