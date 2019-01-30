import {
  repository,
} from '@loopback/repository';
import {
  get,
  post,
  param,
  requestBody,
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

  /**
   * Creates a config.
   * @param config: config to be created.
   */
  @post('/configs', {
    responses: {
      '200': {
        description: 'Config created.',
        content: { 'application/json': { schema: { 'x-ts-type': Config } } },
      },
    },
  })
  async create(@requestBody() config: Config): Promise<Config> {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    config.id = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    return await this.configRepository.create(config);
  }
}
