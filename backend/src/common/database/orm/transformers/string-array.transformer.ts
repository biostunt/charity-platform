import { FindOperator, ValueTransformer } from 'typeorm';

export const stringArrayTransformer: ValueTransformer = {
  to: (
    values: string[] | FindOperator<unknown>,
  ): string | FindOperator<unknown> =>
    'join' in values ? values.join(';') : values,
  from: (values: string): string[] => values.split(';'),
};
