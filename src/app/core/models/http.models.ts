export interface HttpErrorData {
  message: string;
  status: number;
}

export interface HttpState {
  isLoading: boolean;
  isSuccess: boolean;
  error: HttpErrorData | null;
}

export const initialHttpState: HttpState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};
