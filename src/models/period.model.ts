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
    type: 'date',
    required: true,
  })
  start: Date;

  @property({
    type: 'date',
    required: true,
  })
  end: Date;

  @property({
    type: 'date',
    required: true,
  })
  gracePeriod: Date;

  @property({
    type: 'array',
    itemType: 'object',
  })
  proposals: object[];


  constructor(data?: Partial<Period>) {
    super(data);
  }
}
