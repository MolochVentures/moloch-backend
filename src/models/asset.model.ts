import { Entity, model, property } from '@loopback/repository';

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
  })
  symbol: string; // TODO: Make it required again

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
  })
  price: number; // TODO: Make it required again

  @property({
    type: 'string',
  })
  logo: string; // TODO: Make it required again


  constructor(data?: Partial<Asset>) {
    super(data);
  }
}
