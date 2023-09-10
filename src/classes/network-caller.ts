import axios, { AxiosPromise } from "axios";
import { getAccessToken } from "@/classes/utils";

export const GET = "GET";
export const POST = "POST";

interface NetworkCallerParams {
  api: string;
  method: string;
  data?: any;
}

export const callRequest = <T>(
  params: NetworkCallerParams
): AxiosPromise<T> => {
  const url = `http://localhost:3000/${params.api}`;
  return axios({
    method: params.method,
    url,
    data: params.method != GET ? params.data : undefined,
    params: params.method === GET && params.data,
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
