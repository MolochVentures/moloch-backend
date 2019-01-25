import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  patch,
  post,
  param,
  get,
  getFilterSchemaFor,
  requestBody,
} from '@loopback/rest';
import { Member } from '../models';
import { MemberRepository } from '../repositories';

export class MemberController {
  constructor(
    @repository(MemberRepository)
    public memberRepository: MemberRepository,
  ) { }

  @patch('/members/membershipproposal/{id}', {
    responses: {
      '204': {
        description: 'Member PATCH success',
      },
    },
  })
  async createMembershipProposal(
    @param.path.string('id') id: string,
    @requestBody() member: Member,
  ): Promise<Member> {
    member.status = 'waiting';
    return await this.memberRepository.updateById(id, member).then(result => { return member });
  }

  @get('/members/{publicAddress}', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  async findById(@param.path.string('publicAddress') publicAddress: string): Promise<Member> {
    return await this.memberRepository.findById(publicAddress);
  }

  @post('/members', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  async create(@requestBody() member: Member): Promise<Member> {
    member.nonce = Math.floor(Math.random() * 1000000);
    return await this.memberRepository.create(member);
  }

  @get('/members', {
    responses: {
      '200': {
        description: 'Array of Member model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Member } },
          },
        },
      },
    },
  })
  async getAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  @get('/members/getfiltered', {
    responses: {
      '200': {
        description: 'Array of Member model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Member } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Member)) filter?: Filter,
  ): Promise<Member[]> {
    return await this.memberRepository.find(filter);
  }
}
