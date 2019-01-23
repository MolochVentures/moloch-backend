import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  requestBody,
} from '@loopback/rest';
import { Proposal } from '../models';
import { ProposalRepository } from '../repositories';

export class ProposalController {
  constructor(
    @repository(ProposalRepository)
    public proposalRepository: ProposalRepository,
  ) { }

  @post('/proposals/projectproposal', {
    responses: {
      '200': {
        description: 'Submits a project proposal',
        content: { 'application/json': { schema: { 'x-ts-type': Proposal } } },
      },
    },
  })
  async createProjectProposal(@requestBody() proposal: Proposal): Promise<Proposal> {
    // TODO: What should be the right values for these 3?
    // TODO: Which ones should be required? Because currently I have no values for closingTime, gracePeriod and shares.
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    proposal.id = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    proposal.status = 'waiting';
    proposal.closingTime = '';
    proposal.gracePeriod = '';
    return await this.proposalRepository.create(proposal);
  }

  @post('/proposals/membershipproposal', {
    responses: {
      '200': {
        description: 'Submits a membership proposal',
        content: { 'application/json': { schema: { 'x-ts-type': Proposal } } },
      },
    },
  })
  async createMembershipProposal(@requestBody() proposal: Proposal): Promise<Proposal> {
    // TODO: What should be the right values for these 3?
    // TODO: Which ones should be required? Because currently I have no values for closingTime, gracePeriod and shares.
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    proposal.id = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    proposal.status = 'waiting';
    proposal.closingTime = '';
    proposal.gracePeriod = '';
    return await this.proposalRepository.create(proposal);
  }

  @get('/proposals', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Proposal)) filter?: Filter,
  ): Promise<Proposal[]> {
    return await this.proposalRepository.find(filter);
  }

  @get('/proposals/{id}', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Proposal } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Proposal> {
    return await this.proposalRepository.findById(id);
  }
}
