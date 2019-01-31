import { Entity, model, property } from '@loopback/repository';

@model()
class Voter {
  @property({
    type: 'string',
    required: true,
  })
  member: string;

  @property({
    type: 'string',
    required: true,
  })
  vote: string;

  @property({
    type: 'number',
    required: true,
  })
  shares: number;
}

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
    type: 'string',
  })
  period?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  assets?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  voters?: Voter[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  proposals?: object[];


  constructor(data?: Partial<Member>) {
    super(data);
  }
}
