import { Entity, model, property } from '@loopback/repository';

@model()
export class Project extends Entity {
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
    required: true,
  })
  assets: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  voters?: object[];


  constructor(data?: Partial<Project>) {
    super(data);
  }
}
