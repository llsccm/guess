import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}

class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.setInterceptors()
  }

  private setInterceptors() {
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config
    })

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res,
      (err: AxiosError) => {
        console.log('err', err)
        return Promise.reject(err.response ? err.response.data : err)
      }
    )
  }

  public request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return new Promise<ApiResponse<T>>((resolve, reject) => {
      this.instance
        .request<ApiResponse<T>>(config)
        .then((res: AxiosResponse<ApiResponse<T>>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError) => {
          reject(err)
        })
    })
  }
}

const http = new Request({ baseURL: import.meta.env.VITE_BASE_URL, timeout: 15000, withCredentials: false })

export default http
