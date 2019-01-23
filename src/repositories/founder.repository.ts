import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Founder} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FounderRepository extends DefaultCrudRepository<
  Founder,
  typeof Founder.prototype.publicAddress
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Founder, dataSource);
  }
}
