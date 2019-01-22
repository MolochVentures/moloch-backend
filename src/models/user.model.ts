import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
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


  constructor(data?: Partial<User>) {
    super(data);
  }
}
