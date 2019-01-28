import { Entity, model, property } from '@loopback/repository';

@model()
export class Founder extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  assets: object[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  votes: object[];


  constructor(data?: Partial<Founder>) {
    super(data);
  }
}
