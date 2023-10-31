import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"
import { checkJsonFileName } from "src/helpers/format-json"
import { useUploadJson } from "src/hooks/useUpload"
import './style.scss'
export const ChooseFileButton = () => {
    const { fileList, handleUppload, isBusy, setFileList } = useUploadJson()

    return <div className="upload-json-container">
        <Upload listType="text" beforeUpload={() => false} disabled={isBusy} accept='.json' multiple fileList={fileList} onChange={(e) => {
            setFileList(checkJsonFileName(e.fileList) as any)
        }} maxCount={100}>
            <Button >Choose file(s)</Button>
        </Upload>
        {fileList.length > 0 && <div className='upload-button-container'>
            <Button disabled={isBusy} loading={isBusy} onClick={handleUppload} icon={<UploadOutlined />}>Upload</Button>
        </div>}
    </div>
}
