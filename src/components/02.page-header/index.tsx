import { Button, PageHeader, PageHeaderProps } from 'antd';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/store/actions/user';
import { useHistory } from 'react-router';
import { UploadContext } from 'src/contexts/upload';
import { useContext } from 'react';

export interface TridentityPageHeaderProps extends PageHeaderProps { }

const TridentityPageHeader = (props: TridentityPageHeaderProps) => {
  const { className } = props;
  const dispatch = useDispatch()
  const router = useHistory()
  const { tabs } = useContext(UploadContext)
  const onLogout = () => {
    localStorage.clear()
    dispatch(logoutUser())
    router.push('/admin/login')
  }
  const onClickHomePage = () => {
    tabs.setCurrentTab('upload')
  }
  return (
    <div className='page-header-wrapper'>
      <PageHeader {...props} className={`default-page-header ${className ? className : ''}`}>
      <Button onClick={onClickHomePage} type='text'>
        <img src="/logo.svg" alt="" />
      </Button>
      <Button onClick={onLogout} type='text' style={{ color: 'white' }}>Log Out</Button>
    </PageHeader>
    </div>
  );
};

export default TridentityPageHeader;
