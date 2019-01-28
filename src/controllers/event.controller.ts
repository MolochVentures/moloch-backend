import {
  repository,
} from '@loopback/repository';
import {
  post,
  get,
  requestBody,
} from '@loopback/rest';
import { Event } from '../models';
import { EventRepository } from '../repositories';

export class EventController {
  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository,
  ) { }

  /**
   * Creates an event.
   * @param event: event to be created.
   */
  @post('/events', {
    responses: {
      '200': {
        description: 'Creates an event.',
        content: { 'application/json': { schema: { 'x-ts-type': Event } } },
      },
    },
  })
  async create(@requestBody() event: Event): Promise<Event> {
    return await this.eventRepository.create(event);
  }

  /**
   * Returns all the events.
   */
  @get('/events', {
    responses: {
      '200': {
        description: 'Returns all the events.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Event } },
          },
        },
      },
    },
  })
  async find(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
}
