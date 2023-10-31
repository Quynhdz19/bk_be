import { Button, Space, Table, Tooltip, Typography } from 'antd'
import './styles.scss'
import { ColumnsType } from 'antd/lib/table';
import { InfoCircleOutlined } from '@ant-design/icons';
import { EJsonStatus, getJsonStatusFormat } from 'src/helpers/format';
import { UploadContext } from 'src/contexts/upload';
import { useContext } from 'react';

import { blue, grey } from '@ant-design/colors';
import moment from 'moment';

export const JsonQueue = () => {
    const { queue: { onChangePage, queue, tablePagination, refreshQueue, markAllAsRead, isLoading, markOneAsRead } } = useContext(UploadContext)
    return <div className="queue-container">
        <div className='action-buttons'>
            <Button type='primary' onClick={refreshQueue}>Refresh</Button>
            <Button type='primary' onClick={markAllAsRead}>Mark all as Read</Button>
        </div>
        <div className='queue-list-table'>
            <QueueTable markOneAsRead={markOneAsRead} queue={queue} tablePagination={tablePagination} onChangePage={onChangePage} isLoading={isLoading} />
        </div>
    </div>
}


interface DataType {
    file_name: string;
    version: number;
    sku: string;
    batch_id: number;
    status: EJsonStatus;
    view_status: string;
    logs: string[]
}



const QueueTable = ({ queue, tablePagination, onChangePage, isLoading, markOneAsRead }: any) => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'File name',
            dataIndex: 'file_name',
            key: 'filename',
            render: (_, record) => {
                return <p>{record.file_name}_v{record.version}.json</p>
            },

        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, record) => {
                const { type, text } = getJsonStatusFormat(record.status)
                return <div className='json-tooltips'>
                    <Typography.Text type={type as any} className='text'>{text}</Typography.Text>
                    {record.logs.length > 0 && <Tooltip
                        title={`${record.logs.join('\n')}`}
                    ><InfoCircleOutlined /></Tooltip>}
                </div>
            },
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value, _) => {
                return <p>{moment(value).format('DD/MM/YYYY HH:mm').toString()}</p>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: function (data, record) {

                const newViewStatus = record.view_status === 'read' ? 'unread' : 'read'
                if (record.status !== EJsonStatus.FAILED) return <></>
                return (
                    <Space size="middle" onClick={() => markOneAsRead(data._id, newViewStatus)}>
                        <Button type="text">
                            <Typography.Text style={{ color: newViewStatus === 'read' ? blue.primary : grey.primary }} >Mark as {newViewStatus}</Typography.Text>
                        </Button>
                    </Space>
                )
            },
        },
    ];

    return <Table pagination={{
        ...tablePagination,
        onChange: (page) => {
            return onChangePage(page)
        },
        showSizeChanger: false
    }} columns={columns} rowKey={(record, _) => record.file_name + record.version} dataSource={queue} loading={isLoading}
    />
}
