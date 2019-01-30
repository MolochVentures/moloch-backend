import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
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
}
