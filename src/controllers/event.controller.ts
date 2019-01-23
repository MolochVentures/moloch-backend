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
import {Event} from '../models';
import {EventRepository} from '../repositories';

export class EventController {
  constructor(
    @repository(EventRepository)
    public eventRepository : EventRepository,
  ) {}

  @post('/events', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: {'x-ts-type': Event}}},
      },
    },
  })
  async create(@requestBody() event: Event): Promise<Event> {
    return await this.eventRepository.create(event);
  }

  @get('/events/count', {
    responses: {
      '200': {
        description: 'Event model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where,
  ): Promise<Count> {
    return await this.eventRepository.count(where);
  }

  @get('/events', {
    responses: {
      '200': {
        description: 'Array of Event model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Event}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Event)) filter?: Filter,
  ): Promise<Event[]> {
    return await this.eventRepository.find(filter);
  }

  @patch('/events', {
    responses: {
      '200': {
        description: 'Event PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() event: Event,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where,
  ): Promise<Count> {
    return await this.eventRepository.updateAll(event, where);
  }

  @get('/events/{id}', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: {'x-ts-type': Event}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Event> {
    return await this.eventRepository.findById(id);
  }

  @patch('/events/{id}', {
    responses: {
      '204': {
        description: 'Event PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() event: Event,
  ): Promise<void> {
    await this.eventRepository.updateById(id, event);
  }

  @put('/events/{id}', {
    responses: {
      '204': {
        description: 'Event PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() event: Event,
  ): Promise<void> {
    await this.eventRepository.replaceById(id, event);
  }

  @del('/events/{id}', {
    responses: {
      '204': {
        description: 'Event DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventRepository.deleteById(id);
  }
}
