import { Entity, model, property } from '@loopback/repository';

@model()
export class Member extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
  })
  nonce: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  shares?: number;

  @property({
    type: 'number',
  })
  tribute?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  period?: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  assets?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  voters?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  proposals?: object[];


  constructor(data?: Partial<Member>) {
    super(data);
  }
}
