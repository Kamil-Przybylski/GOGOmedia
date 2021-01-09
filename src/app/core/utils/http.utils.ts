import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorData } from '../models/http.models';

export class HttpUtils {
  public static getHttpErrorResponse(error: HttpErrorResponse): HttpErrorData {
    return {
      message: error?.error?.message || error?.message || 'Connection Error!',
      status: error?.status || 500,
    };
  }
}
