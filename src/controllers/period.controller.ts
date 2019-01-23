import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Period} from '../models';
import {PeriodRepository} from '../repositories';

export class PeriodController {
  constructor(
    @repository(PeriodRepository)
    public periodRepository : PeriodRepository,
  ) {}

  @post('/periods', {
    responses: {
      '200': {
        description: 'Period model instance',
        content: {'application/json': {schema: {'x-ts-type': Period}}},
      },
    },
  })
  async create(@requestBody() period: Period): Promise<Period> {
    return await this.periodRepository.create(period);
  }

  @get('/periods/count', {
    responses: {
      '200': {
        description: 'Period model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Period)) where?: Where,
  ): Promise<Count> {
    return await this.periodRepository.count(where);
  }

  @get('/periods', {
    responses: {
      '200': {
        description: 'Array of Period model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Period}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Period)) filter?: Filter,
  ): Promise<Period[]> {
    return await this.periodRepository.find(filter);
  }

  @patch('/periods', {
    responses: {
      '200': {
        description: 'Period PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() period: Period,
    @param.query.object('where', getWhereSchemaFor(Period)) where?: Where,
  ): Promise<Count> {
    return await this.periodRepository.updateAll(period, where);
  }

  @get('/periods/{id}', {
    responses: {
      '200': {
        description: 'Period model instance',
        content: {'application/json': {schema: {'x-ts-type': Period}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Period> {
    return await this.periodRepository.findById(id);
  }

  @patch('/periods/{id}', {
    responses: {
      '204': {
        description: 'Period PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() period: Period,
  ): Promise<void> {
    await this.periodRepository.updateById(id, period);
  }

  @put('/periods/{id}', {
    responses: {
      '204': {
        description: 'Period PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() period: Period,
  ): Promise<void> {
    await this.periodRepository.replaceById(id, period);
  }

  @del('/periods/{id}', {
    responses: {
      '204': {
        description: 'Period DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.periodRepository.deleteById(id);
  }
}
