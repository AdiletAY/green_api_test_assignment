export const greenApiEndpoints = {
  getSettings: (idInstance: string, apiTokenInstance: string) =>
    `/waInstance${idInstance}/getSettings/${apiTokenInstance}`,

  getStateInstance: (idInstance: string, apiTokenInstance: string) =>
    `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,

  sendMessage: (idInstance: string, apiTokenInstance: string) =>
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,

  sendFileByUrl: (idInstance: string, apiTokenInstance: string) =>
    `/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`,
} as const
