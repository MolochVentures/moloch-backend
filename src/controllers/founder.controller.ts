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
import {Founder} from '../models';
import {FounderRepository} from '../repositories';

export class FounderController {
  constructor(
    @repository(FounderRepository)
    public founderRepository : FounderRepository,
  ) {}

  @post('/founders', {
    responses: {
      '200': {
        description: 'Founder model instance',
        content: {'application/json': {schema: {'x-ts-type': Founder}}},
      },
    },
  })
  async create(@requestBody() founder: Founder): Promise<Founder> {
    return await this.founderRepository.create(founder);
  }

  @get('/founders/count', {
    responses: {
      '200': {
        description: 'Founder model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Founder)) where?: Where,
  ): Promise<Count> {
    return await this.founderRepository.count(where);
  }

  @get('/founders', {
    responses: {
      '200': {
        description: 'Array of Founder model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Founder}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Founder)) filter?: Filter,
  ): Promise<Founder[]> {
    return await this.founderRepository.find(filter);
  }

  @patch('/founders', {
    responses: {
      '200': {
        description: 'Founder PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() founder: Founder,
    @param.query.object('where', getWhereSchemaFor(Founder)) where?: Where,
  ): Promise<Count> {
    return await this.founderRepository.updateAll(founder, where);
  }

  @get('/founders/{id}', {
    responses: {
      '200': {
        description: 'Founder model instance',
        content: {'application/json': {schema: {'x-ts-type': Founder}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Founder> {
    return await this.founderRepository.findById(id);
  }

  @patch('/founders/{id}', {
    responses: {
      '204': {
        description: 'Founder PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() founder: Founder,
  ): Promise<void> {
    await this.founderRepository.updateById(id, founder);
  }

  @put('/founders/{id}', {
    responses: {
      '204': {
        description: 'Founder PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() founder: Founder,
  ): Promise<void> {
    await this.founderRepository.replaceById(id, founder);
  }

  @del('/founders/{id}', {
    responses: {
      '204': {
        description: 'Founder DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.founderRepository.deleteById(id);
  }
}
