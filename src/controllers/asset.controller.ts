import {
  repository,
} from '@loopback/repository';
import {
  post,
  get,
  requestBody,
} from '@loopback/rest';
import { Asset } from '../models';
import { AssetRepository } from '../repositories';

export class AssetController {
  constructor(
    @repository(AssetRepository)
    public assetRepository: AssetRepository,
  ) { }

  /**
   * Returns all existing assets.
   */
  @get('/assets', {
    responses: {
      '200': {
        description: 'Returned all assets.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Asset } },
          },
        },
      },
    },
  })
  async findAll(): Promise<Asset[]> {
    return await this.assetRepository.find();
  }

  /**
   * Creates a asset.
   * @param asset: asset to be created.
   */
  @post('/assets', {
    responses: {
      '200': {
        description: 'Asset created.',
        content: { 'application/json': { schema: { 'x-ts-type': Asset } } },
      },
    },
  })
  async create(@requestBody() asset: Asset): Promise<Asset> {
    return await this.assetRepository.create(asset);
  }
}
