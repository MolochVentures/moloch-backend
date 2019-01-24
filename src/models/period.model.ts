import { Entity, model, property } from '@loopback/repository';

@model()
export class Period extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  periods: object[];


  constructor(data?: Partial<Period>) {
    super(data);
  }
}
