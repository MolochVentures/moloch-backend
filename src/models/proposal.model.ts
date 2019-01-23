import { Entity, model, property } from '@loopback/repository';

@model()
export class Proposal extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  title: string;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'number',
  })
  tribute: number;

  @property({
    type: 'number',
  })
  shares: number;

  @property({
    type: 'string',
  })
  status: string;

  @property({
    type: 'string',
  })
  closingTime: string;

  @property({
    type: 'string',
  })
  gracePeriod: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  assets: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  voters?: object[];


  constructor(data?: Partial<Proposal>) {
    super(data);
  }
}
