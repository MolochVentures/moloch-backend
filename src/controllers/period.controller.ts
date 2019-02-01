import {
  repository,
  AnyType,
} from '@loopback/repository';
import {
  get,
  param,
} from '@loopback/rest';
import {
  Period
} from '../models';
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
  ): Promise<any> {
    // Filter to retrieve the current periods.
    currentDate = currentDate;
    let filterCurrent = {
      where:
      {
        start: { lte: new Date(currentDate) },
        end: { gte: new Date(currentDate) }
      }
    }
    // Structure to return all the proposals organized by their status.
    let organizedPeriods = {
      pending: [] as Array<any>,
      inProgress: [] as Array<any>,
      accepted: [] as Array<any>,
      rejected: [] as Array<any>,
    }
    // Get all the current periods.
    return await this.periodRepository.find(filterCurrent).then(async periods => {
      if (periods && periods.length > 0) {
        // We store all the ids of the proposals from the current periods.
        let proposalIds = {
          memberProposals: [] as Array<any>,
          projectProposals: [] as Array<any>
        }
        periods.forEach(period => {
          period.proposals.forEach(periodProposal => {
            if (periodProposal.type === 'member') {
              proposalIds.memberProposals.push({ id: periodProposal.id, end: period.end, gracePeriod: period.gracePeriod });
            } else {
              proposalIds.projectProposals.push({ id: periodProposal.id, end: period.end, gracePeriod: period.gracePeriod });
            }
          });
        });
        // Now, we get all the membership proposals.
        return await this.memberRepository.find().then(async (members: Array<any>) => {
          if (members && members.length > 0) {
            // And store only those that aren't founders. If any matches a proposal from the current periods, that one is inProgress.
            members.forEach(member => {
              let isMemberInProgress = false;
              proposalIds.memberProposals.forEach(periodProposal => {
                if (periodProposal.id === member.address) {
                  isMemberInProgress = true;
                  member.end = periodProposal.end;
                  member.gracePeriod = periodProposal.gracePeriod;
                }
              });
              if (isMemberInProgress) {
                member.status = 'inprogress';
                organizedPeriods.inProgress.push(member);
              } else {
                switch (member.status) {
                  case 'active':
                    organizedPeriods.accepted.push(member);
                    break;
                  case 'inactive':
                    organizedPeriods.rejected.push(member);
                    break;
                  case 'pending':
                    organizedPeriods.pending.push(member);
                    break;
                }
              }
            });
          }
          // Now, we get all the project proposals.
          return await this.projectRepository.find().then(async (projects: Array<any>) => {
            if (projects && projects.length > 0) {
              // And store them. If any matches a proposal from the current periods, that one is inProgress.
              projects.forEach(project => {
                let isProjectInProgress = false;
                proposalIds.projectProposals.forEach(periodProposal => {
                  if (periodProposal.id === project.id) {
                    isProjectInProgress = true;
                    project.end = periodProposal.end;
                    project.gracePeriod = periodProposal.gracePeriod;
                  }
                });
                if (isProjectInProgress) {
                  project.status = 'inprogress';
                  organizedPeriods.inProgress.push(project);
                } else {
                  switch (project.status) {
                    case 'accepted':
                      organizedPeriods.accepted.push(project);
                      break;
                    case 'rejected':
                      organizedPeriods.rejected.push(project);
                      break;
                    case 'pending':
                      organizedPeriods.pending.push(project);
                      break;
                  }
                }
              });
            }
            return await organizedPeriods;
          });
        });
      }
    });
  }
}
