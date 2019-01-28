import {
  repository,
} from '@loopback/repository';
import {
  get,
  param,
} from '@loopback/rest';
import { Config } from '../models';
import { ConfigRepository } from '../repositories';

export class ConfigController {
  constructor(
    @repository(ConfigRepository)
    public configRepository: ConfigRepository,
  ) { }

  /**
   * Returns a config filtered by its id.
   * @param id: id of the config to be returned.
   */
  @get('/configs/{id}', {
    responses: {
      '200': {
        description: 'Returned config by id.',
        content: { 'application/json': { schema: { 'x-ts-type': Config } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Config> {
    return await this.configRepository.findById(id);
  }
}
