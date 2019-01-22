import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.publicAddress
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }
}
