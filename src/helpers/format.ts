

export enum EJsonStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}
const statusError = {
    type: 'danger',
    text: 'Error'
}
const statusProcessing = {
    type: 'secondary',
    text: 'Processing'
}
const statusPending = {
    type: 'secondary',
    text: 'Pending'
}

export const getJsonStatusFormat = (status: EJsonStatus) => {
    if (status === EJsonStatus.FAILED) return statusError
    if (status === EJsonStatus.PENDING) return statusPending
    return statusProcessing
}