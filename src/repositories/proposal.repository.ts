import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Proposal} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProposalRepository extends DefaultCrudRepository<
  Proposal,
  typeof Proposal.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Proposal, dataSource);
  }
}
