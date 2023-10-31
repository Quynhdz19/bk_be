import { UploadFile } from "antd";
import { EMessageJson } from "src/constants/message";

export const convertToExpectedOutputJson = (file: any) => {
  const { name, image_url, owner, sku } = file?.asset;
  const newAsset = {
    name,
    image_url,
    owner,
    sku,
  };

  const newTraceableJourney = file?.traceable_journey?.map(
    (item: any) => item.data
  );

  return {
    asset: newAsset,
    traceable_journey: newTraceableJourney,
  };
};

export const checkJsonFileName = (files: UploadFile[]) => {
  const isExist: Map<string, boolean> = new Map()
  return files.map(f => {
    try {
      const metadata = getFileVersion(f.name as string);
      
      if (isExist.get(metadata.fileName) === true) {
        f.error = true;
        f.status = "error";
        f.response = EMessageJson.UPLOAD_ONE_VERSION_AT_ONCE
      } else {
        isExist.set(metadata.fileName, true)
        f.error = false;
        f.status = undefined;
        f.response = ''
      }
      return f;
    } catch (error) {
      return f
    }
  })
}

const getFileVersion = (originalName: string): { error: boolean, message: string, fileName: string } => {
  const result = {
    error: true,
    message: '',
    fileName: '',
    version: 0
  }
  try {
    console.log(originalName);
    
    const [file_name] = originalName.split('.');
    console.log(file_name);
    const data = file_name.split('_');
    result.fileName = data[0]
    result.version = parseInt(data[1].slice(1));
    
    result.error = false;
    result.message = '';
    return result;
  } catch {
    result.message = EMessageJson.CHECK_FILE_NAME
    return result;
  }
};
