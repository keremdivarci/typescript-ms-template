/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { UserSession } from '../..';
import { LoginSchema } from '..';

export interface CheckSessionInput {
  body?: undefined;
  query?: undefined;
  user: UserSession;
}

export interface LoginInput {
  body: LoginSchema;
  query?: undefined;
  user?: undefined;
}

export interface LogoutInput {
  body?: undefined;
  query?: undefined;
  user: UserSession;
}
