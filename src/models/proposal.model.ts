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
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  tribute: number;

  @property({
    type: 'number',
  })
  shares: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  period: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  voters?: object[];


  constructor(data?: Partial<Proposal>) {
    super(data);
  }
}
