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

  /**
   * Returns all existing members.
   */
  @get('/members', {
    responses: {
      '200': {
        description: 'Returned all members.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Member } },
          },
        },
      },
    },
  })
  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  /**
   * Returns a member filtered by its id.
   * @param id: id of the member to be returned.
   */
  @get('/members/{id}', {
    responses: {
      '200': {
        description: 'Returned member by id.',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Member> {
    return await this.memberRepository.findById(id);
  }

  /**
   * Returns members filtered according to the request's data.
   * @param filter: filter to query the members.
   */
  @get('/members/getfiltered', {
    responses: {
      '200': {
        description: 'Returned filtered members.',
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

  /**
   * Creates a member.
   * @param member: member to be created.
   */
  @post('/members', {
    responses: {
      '200': {
        description: 'Member created.',
        content: { 'application/json': { schema: { 'x-ts-type': Member } } },
      },
    },
  })
  async create(@requestBody() member: Member): Promise<Member> {
    member.nonce = Math.floor(Math.random() * 1000000);
    return await this.memberRepository.create(member);
  }

  /**
   * Modifies a member.
   * @param id: id of the member to be modified.
   * @param member: data to modify the member.
   */
  @patch('/members/{address}', {
    responses: {
      '204': {
        description: 'Member modified.',
      },
    },
  })
  async updateById(
    @param.path.string('address') address: string,
    @requestBody() member: Member,
  ): Promise<Member> {
    member.name = member.address;
    member.status = 'pending';
    member.voters = [];
    member.proposals = [];
    return await this.memberRepository.updateById(address, member).then(result => { return member });
  }
}
