import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResultResponse } from "./models";

const HOST = process.env.REACT_APP_API_URL;
const UPLOAD = "uploadFile";
const GENERATE = "generateResult";

export const UploadFileAction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  if (file === undefined) return;
  const axiosConfig: AxiosRequestConfig = {
    method: "post",
    url: `${HOST}/${UPLOAD}`,
    params: {},
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response: AxiosResponse<string[]> = await axios(axiosConfig);
    return response;
  } catch (error) {
    console.error("Error uploading file", error);
  }
};

export const GenerateResultAction = async (candids: number[][]) => {
  const formData = new FormData();
  formData.append("candids", JSON.stringify(candids));
  const axiosConfig: AxiosRequestConfig = {
    method: "post",
    url: `${HOST}/${GENERATE}`,
    params: {},
    data: formData,
    headers: {},
  };

  try {
    const response: AxiosResponse<ResultResponse> = await axios(axiosConfig);
    return response;
  } catch (error) {
    console.error("Error uploading file", error);
  }
};

// candids
