import {
  repository,
  Filter
} from '@loopback/repository';
import {
  post,
  param,
  get,
  requestBody,
  getFilterSchemaFor,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';

export class AuthenticationController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/nonce', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  nonce(): number {
    return Math.floor(Math.random() * 1000000);
  }

  @get('/users/{publicAddress}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async findById(@param.path.string('publicAddress') publicAddress: string): Promise<User> {
    return await this.userRepository.findById(publicAddress);
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    user.nonce = Math.floor(Math.random() * 1000000);
    console.log(user);
    return await this.userRepository.create(user);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }
}
