import { Entity, model, property } from '@loopback/repository';

@model()
export class Config extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'object',
    required: true,
  })
  configuration: object;


  constructor(data?: Partial<Config>) {
    super(data);
  }
}
