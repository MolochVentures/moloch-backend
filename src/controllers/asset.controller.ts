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
import {Asset} from '../models';
import {AssetRepository} from '../repositories';

export class AssetController {
  constructor(
    @repository(AssetRepository)
    public assetRepository : AssetRepository,
  ) {}

  @post('/assets', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {'application/json': {schema: {'x-ts-type': Asset}}},
      },
    },
  })
  async create(@requestBody() asset: Asset): Promise<Asset> {
    return await this.assetRepository.create(asset);
  }

  @get('/assets/count', {
    responses: {
      '200': {
        description: 'Asset model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Asset)) where?: Where,
  ): Promise<Count> {
    return await this.assetRepository.count(where);
  }

  @get('/assets', {
    responses: {
      '200': {
        description: 'Array of Asset model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Asset}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Asset)) filter?: Filter,
  ): Promise<Asset[]> {
    return await this.assetRepository.find(filter);
  }

  @patch('/assets', {
    responses: {
      '200': {
        description: 'Asset PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() asset: Asset,
    @param.query.object('where', getWhereSchemaFor(Asset)) where?: Where,
  ): Promise<Count> {
    return await this.assetRepository.updateAll(asset, where);
  }

  @get('/assets/{id}', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {'application/json': {schema: {'x-ts-type': Asset}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Asset> {
    return await this.assetRepository.findById(id);
  }

  @patch('/assets/{id}', {
    responses: {
      '204': {
        description: 'Asset PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() asset: Asset,
  ): Promise<void> {
    await this.assetRepository.updateById(id, asset);
  }

  @put('/assets/{id}', {
    responses: {
      '204': {
        description: 'Asset PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asset: Asset,
  ): Promise<void> {
    await this.assetRepository.replaceById(id, asset);
  }

  @del('/assets/{id}', {
    responses: {
      '204': {
        description: 'Asset DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.assetRepository.deleteById(id);
  }
}
