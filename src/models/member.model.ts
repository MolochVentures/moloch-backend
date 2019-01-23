import { Entity, model, property } from '@loopback/repository';

@model()
export class Member extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  publicAddress: string;

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
    type: 'number',
  })
  value?: number;

  @property({
    type: 'number',
  })
  shares?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  assets?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  votes?: object[];


  constructor(data?: Partial<Member>) {
    super(data);
  }
}
