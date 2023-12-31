export class ApiResponse {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Success",
    data: any = null
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode >= 200 && statusCode < 300;
  }
}
