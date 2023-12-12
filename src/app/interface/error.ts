export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
