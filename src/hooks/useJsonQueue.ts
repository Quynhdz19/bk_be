import { message } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { QUEUE_UPDATE_TIMEOUT } from "src/constants/time";
import { JsonServices } from "src/services/upload-service"
const defaultPageSize = 10;
export const useJsonQueue = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [queue, setQueue] = useState<any[]>([])
    const [unreadQueue, setUnreadQueue] = useState<number>(0)
    const [tablePagination, setPagination] = useState({
        current: 1,
        pageSize: defaultPageSize,
        total: 0
    })
    const jsonService = useMemo(() => {
        return new JsonServices()
    }, [])
    const onChangePage = useCallback(async (page: number, setBusyStatus = true):Promise<boolean> => {
        if (setBusyStatus) setLoading(true)
        const result = await jsonService.getQueuedJson({
            status: ['failed', 'pending', 'processing'],
            page: page,
            limit: defaultPageSize,
            sort_field: 'created_at',
            sort_direction: 'DESC'
        })
        const { items, pagination } = result.data;

        if (pagination.total_pages < page) {
            return onChangePage(pagination.total_pages, setBusyStatus)
        }
        setQueue(items)
        setPagination({
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total_items
        })
        setLoading(false)
        return true;
    }, [jsonService])
    const getUnreadQueue = useCallback(async () => {
        const result = await jsonService.getQueuedJson({
            status: ['failed', 'pending', 'processing'],
            page: 1,
            limit: 1,
            view_status: 'unread',
            sort_field: '_id',
            sort_direction: 'DESC'
        })
        const { pagination } = result.data;
        setUnreadQueue(pagination.total_items)
    }, [jsonService])
    useEffect(() => {
        onChangePage(1)
        getUnreadQueue()
        // eslint-disable-next-line 
    }, [])
    useEffect(() => {
        let interval = setInterval(() => {
            onChangePage(tablePagination.current, false)
            getUnreadQueue()
        }, QUEUE_UPDATE_TIMEOUT)
        return () => {
            clearInterval(interval)
        }
    }, [tablePagination, getUnreadQueue, onChangePage])


    const refreshQueue = useCallback(() => {
        onChangePage(1)
        getUnreadQueue()
        return true;
    }, [onChangePage, getUnreadQueue])
    const markOneAsRead = useCallback(async (id: string, new_status: string) => {
        const result = await jsonService.markQueuedJsonAsRead(id, { new_status })
        if (result.success) {
            await getUnreadQueue()
            setQueue(q => q.map((e) => {
                if (e._id === id) {
                    e.view_status = new_status;
                    return e;
                }
                return e;
            }))
            return message.success(`Mark item as ${new_status} successfully!`)
        }
        return message.error(`Mark item as ${new_status} failed!`)
    }, [getUnreadQueue, jsonService])
    const markAllAsRead = useCallback(async () => {
        const result = await jsonService.markAllQueuedJsonAsRead()
        if (result.success && await refreshQueue()) {
            await getUnreadQueue()
            return message.success("Mark all message as read successfully!")
        }
        return message.error("Mark all message as read failed!")
    }, [jsonService, getUnreadQueue, refreshQueue])

    return { onChangePage, queue, tablePagination, refreshQueue, markAllAsRead, markOneAsRead, isLoading, unreadQueue }
}