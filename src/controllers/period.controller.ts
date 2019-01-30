import {
  repository,
  AnyType,
} from '@loopback/repository';
import {
  get,
  param,
} from '@loopback/rest';
import {
  MemberRepository,
  PeriodRepository,
  ProjectRepository
} from '../repositories';

export class PeriodController {
  constructor(
    @repository(MemberRepository)
    public memberRepository: MemberRepository,

    @repository(PeriodRepository)
    public periodRepository: PeriodRepository,

    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
  ) { }

  /**
   * Returns periods filtered according to the request's data.
   * @param currentDate: current date to filter the periods.
   */
  @get('/periods/getfiltered', {
    responses: {
      '200': {
        description: 'Returned filtered periods.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': AnyType } },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('currentDate') currentDate: string,
  ): Promise<any[]> {
    let filter = {
      where:
      {
        start: { lte: new Date(currentDate) },
        end: { gte: new Date(currentDate) }
      }
    }
    // Get the current period.
    return await this.periodRepository.find(filter).then(async response => {
      let proposals: Array<any> = [];
      let projectIds = response[0].proposals.filter(proposal => proposal.type === 'project').map(project => project.id);
      let memberIds = response[0].proposals.filter(proposal => proposal.type === 'member').map(member => member.id);
      // Get the complete data of the members inside that period.
      return await this.memberRepository.find({ where: { address: { inq: memberIds } } }).then(async (members: Array<any>) => {
        proposals.push(members);
        // Get the complete data of the projects inside that period.
        return await this.projectRepository.find({ where: { id: { inq: projectIds } } }).then(async (projects: Array<any>) => {
          proposals.push(projects);
          // Return an array with members and projects inside that period.
          return proposals;
        })
      });
    });
  }
}
