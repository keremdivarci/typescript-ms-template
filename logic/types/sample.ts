/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface createSample {
  age?: number;
  name: string;
}

export interface deleteSample {
  name: string;
}

export interface getSample {
  name?: string;
}

export interface updateSample {
  name: string;
  sample?: {
    age?: number;
    name?: string;
  };
}
