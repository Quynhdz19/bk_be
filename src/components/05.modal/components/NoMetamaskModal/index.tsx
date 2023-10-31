import OtoriModal from 'src/components/05.modal';
import MetamaskError from 'src/assets/icons/metamask-error.svg';
import './styles.scss';

const metamaskLink =
  'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

export interface NoMetamaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const NoMetamaskModal = (props: NoMetamaskModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <OtoriModal
      className="no-metamask-modal"
      open={isOpen}
      onCancel={onClose}
      title={false}
      footer={false}
    >
      <div className="no-metamask-modal_icon">
        <img src={MetamaskError} alt="metamask-error" />
      </div>
      <div className="no-metamask-modal_text">
        You haven’t got MetaMask, please download to start invest
      </div>
      <button className="download-metamask-btn" style={{ width: '100%' }}>
        <a href={metamaskLink} target="_blank" rel="noreferrer">
          Download metamask
        </a>
      </button>
    </OtoriModal>
  );
};

export default NoMetamaskModal;
