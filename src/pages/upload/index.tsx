import './styles.scss';
import { TabsProps } from 'antd';
import TridentityTabs from 'src/components/08.tab';
import TridentityPageHeader from 'src/components/02.page-header';
import { ChooseFileButton } from 'src/components/09.upload-json';
import { JsonQueue } from 'src/components/10.json-queue';
import { UploadContext, UploadProvider } from 'src/contexts/upload';
import { useContext } from 'react';
import { useMemo } from 'react';
import DownloadPage from '../download';


const UploadPage = () => {
  const { queue, tabs } = useContext(UploadContext)

  const tabsProps: TabsProps['items'] = useMemo(() => ([
    {
      key: 'upload',
      label: 'Upload',
      children: <ChooseFileButton />
    },
    {
      key: 'download',
      label: 'Download',
      children: <DownloadPage />
    },
    {
      key: 'queue',
      label: `Queue ${queue.unreadQueue > 0 ? `(${queue.unreadQueue})` : ''}`,
      children: <JsonQueue />
    }
  ]), [queue])

  return <div className='upload-container'>
    <TridentityPageHeader />
    <TridentityTabs className='ennotrace' onChange={(e) => {
      tabs.setCurrentTab(e)
    }} activeKey={tabs.currentTab} items={tabsProps} />
  </div>;
};




export default function UploadPageWithContext() {
  return <UploadProvider>
    <UploadPage />
  </UploadProvider>
};
