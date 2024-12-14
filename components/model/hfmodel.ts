import RNFS from 'react-native-fs';
import axios from 'axios';

const limit: number = 5;  // number of returns
const full: string ="true";  // "false"
const config: string = "true";  // "false"
const filter: string = 'gguf';  // limit the results to gguf

export const HF_DOMAIN = "https://huggingface.co";
export const HF_API_BASE =`${HF_DOMAIN}/api/models`;
export const FS_FILEPATH = `${RNFS.DocumentDirectoryPath}`;

// Important API for retrieving the model size and gguf file given the model ID
export function modelTree(modelID: string) {
    return `${HF_API_BASE}/${modelID}/tree/main`;
}

// Using the main HF API endpoint to return a list of relevant model cards
// Important info: model ID, Likes, Downloads
export function modelList(search: string) {
  return `${HF_API_BASE}?search=${search}&filter=${filter}&limit=${limit}&full=${full}&config=${config}`;
}

// Link to the web page, will be included with Likes and Downloads
export function modelRepo(modelID: string) {
  return `${HF_DOMAIN}/${modelID}`;
}

// Link to download the model
export function modelDownloadLink(modelID: string, modelFile: string) {
  return `${HF_DOMAIN}/${modelID}/resolve/main/${modelFile}`;
}

export interface hfModelFileProp {
  filename: string;
  size: number; // in Bytes, divide by 1 x 10^9 for GB
}

export interface hfModelProp {
  id: string;
  likes: number;
  nDownloads: number;
  link: string;
  files: hfModelFileProp[];
}

// return the gguf files and their sizes given a model ID repo
export async function getModelFileAndSize(modelID: string): Promise<hfModelFileProp[]> {
  try {
    const response = await axios.get(modelTree(modelID));
    
    let modelFiles: hfModelFileProp[] = [];
    for (const item of response.data) {
      if (item['path'].toLowerCase().includes(".gguf")) {
        modelFiles.push(
          {
            filename: item['path'],
            size: item['size'],
          }
        );
      }
    }
    console.log(modelFiles);
    return modelFiles;
  } catch(error) {
    console.error('Failed to fetch model files:', error);
    return [];
  }
}

// Retrieve a list of gguf models from huggingface based on the search input
export async function getModelLists(search: string): Promise<hfModelProp[]> {
    try {
      const response = await axios.get(modelList(search));
      let modelLists: hfModelProp[] = [];
      for (const data of response.data) {
        modelLists.push(
          {
            id: data["id"],
            likes: data["likes"],
            nDownloads: data["downloads"],
            link: modelRepo(data["id"]),
            files: await getModelFileAndSize(data["id"]),
          }
        )
      }
      console.log(modelLists);
      return modelLists;
    } catch(error) {
      console.error('Search failed with the following error:', error);
      return [];
    }
}

// Download the model
export async function downloadModel(
  modelID: string,
  model: hfModelFileProp,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFail: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      const sess = RNFS.downloadFile({
        fromUrl: modelDownloadLink(modelID, model.filename),
        toFile: `${FS_FILEPATH}/${model.filename}`,
        begin: (res) => {},
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength * 100);
          setProgress(progress);
          // console.log(`Download progress ${model.filename}: ${progress}%`);
          if (progress > 99.95) {
            setIsComplete(true);
          }
        }
      })
      // if (setJobID != null) {
      //   setJobID(sess.jobId);
      // }
    } catch(error) {
      console.error('Download failed:', error);
      try {
        await RNFS.unlink(`${FS_FILEPATH}/${model.filename}`);
      } catch(error) {
        console.error('Error removing file:', error);
      }
      setIsFail(true);
    }
}

// get existing models
export async function getDownloadedModels(): Promise<hfModelFileProp[]> {
  const files =  await RNFS.readDir(`${FS_FILEPATH}`);
  let modelFiles: hfModelFileProp[] = [];
  for (const file of files) {

    if (file.name.toLowerCase().includes(".gguf")) {
        modelFiles.push(
          {
            filename: file.name,
            size: file.size
          }
        );
        // console.log(`Name: ${file.name}, Size: ${file.size}, Path: ${file.path}`);
    }
  }
  return modelFiles;
}