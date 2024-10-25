/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { CreateTemplateSchema, QueryTemplatesSchema, UpdateTemplateSchema } from '..';
import { UserSession, BaseIdInput } from '../..';

export interface CreateTemplateInput {
  body: CreateTemplateSchema;
  query?: undefined;
  user: UserSession;
}

export interface QueryTemplatesInput {
  body?: undefined;
  query: QueryTemplatesSchema;
  user?: UserSession;
}

export interface RemoveTemplateInput {
  body?: undefined;
  query: BaseIdInput;
  user?: UserSession;
}

export interface UpdateTemplateInput {
  body: UpdateTemplateSchema;
  query?: undefined;
  user?: UserSession;
}