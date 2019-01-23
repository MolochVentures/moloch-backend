import {Entity, model, property} from '@loopback/repository';

@model()
export class Asset extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  publicAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  symbol: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  logo: string;


  constructor(data?: Partial<Asset>) {
    super(data);
  }
}