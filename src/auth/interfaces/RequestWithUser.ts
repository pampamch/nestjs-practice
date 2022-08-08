import { Request } from 'express';
import { User } from 'src/typeorm/User';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
