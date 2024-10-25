/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { QueryImageSchema, UploadImageSchema } from '..';
import { UserSession, BaseIdInput } from '../..';

export interface QueryTemplateImageInput {
  body?: undefined;
  params: QueryImageSchema;
  query?: undefined;
  user?: UserSession;
}

export interface RemoveTemplateImageInput {
  body?: undefined;
  params: BaseIdInput;
  query?: undefined;
  user?: UserSession;
}

export interface UploadTemplateImageInput {
  body: UploadImageSchema;
  query?: undefined;
  user?: UserSession;
}
