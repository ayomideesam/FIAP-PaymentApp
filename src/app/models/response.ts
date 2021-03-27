import {IResponse} from '../interfaces/iresponse';

export class Response implements IResponse {
  data: any;
  code: number;
  status: string;
  msg: string;
}
