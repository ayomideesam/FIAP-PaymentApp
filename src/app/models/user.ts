import {Iuser} from '../interfaces/iuser';

export class User implements Iuser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
