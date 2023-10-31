import { message } from "antd"
import { RcFile, UploadFile } from "antd/lib/upload"
import { useCallback, useContext, useState } from "react"
import { UploadContext } from "src/contexts/upload"
import { JsonServices } from "src/services/upload-service"

export const useUploadJson = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isBusy, setBusy] = useState<boolean>(false)
  const { queue: { refreshQueue } } = useContext(UploadContext)
  const handleUppload = useCallback(async () => {

    if (fileList.length === 0) {
      message.warn("No file choosen!")
      return;
    }
    setBusy(true)

    const uploader = new JsonServices()
    for (let file of fileList) {
      if (file?.error === true) {
        continue;
      }
      // upload file here
      setFileList((list) => {
        return list.map(e => {
          if (e.uid === file.uid) {
            return { ...e, status: 'uploading' };
          }
          return e
        })
      })

      // TODO: validate file before upload
      
      const jsonValidate = await validateFileBeforeUpload(file)


      let result: any;
      if (jsonValidate.success === true) {
        result = await uploader.uploadSingles({ file: file.originFileObj as RcFile })
      } else {
        result = jsonValidate
      }

      setFileList((list) => {
        if (result.success) {
          message.success(`File ${result.data.file_name}_v${result.data.version}.json is being in queue to process`)
          return list.filter((e, i) => e.uid !== file.uid)
        }
        return list.map((e, i) => {
          if (e.uid === file.uid) {
            return { ...e, status: 'error', response: result.message };
          }
          return e
        })
      })
    }
    refreshQueue()
    setBusy(false)
  }, [fileList, refreshQueue])

  return { fileList, handleUppload, isBusy, setFileList }
}


const validateFileBeforeUpload = async (file: UploadFile) => {
  try {
    const result = await (file.originFileObj as any).text()
    return {
      success: true,
      message: typeof result
    }
  } catch (error) {
    return {
      success: false,
      message: 'Json file changed! Try select the json file again!'
    }
  }
}