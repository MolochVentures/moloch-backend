import {
  repository, Filter,
} from '@loopback/repository';
import {
  get,
  getFilterSchemaFor,
  param,
} from '@loopback/rest';
import { Period } from '../models';
import { PeriodRepository } from '../repositories';

export class PeriodController {
  constructor(
    @repository(PeriodRepository)
    public periodRepository: PeriodRepository,
  ) { }

  /**
   * Returns periods filtered according to the request's data.
   * @param filter: filter to query the periods.
   */
  @get('/periods/getfiltered', {
    responses: {
      '200': {
        description: 'Returned filtered periods.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Period } },
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
}
