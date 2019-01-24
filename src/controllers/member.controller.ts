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
import { Member } from '../models';
import { MemberRepository } from '../repositories';

export class MemberController {
  constructor(
    @repository(MemberRepository)
    public memberRepository: MemberRepository,
  ) { }

  @post('/members/membershipproposal', {
    responses: {
      '200': {
        description: 'Submits a membership proposal',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  async createMembershipProposal(@requestBody() member: Member): Promise<Member> {
    member.status = 'waiting';
    return await this.memberRepository.create(member);
  }

  @get('/members/nonce', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  nonce(): number {
    return Math.floor(Math.random() * 1000000);
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
