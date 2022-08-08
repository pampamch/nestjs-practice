import { ISession } from 'connect-typeorm/out';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
// @Index(["firstName", "lastName"])
// use it on the entity when a single index on multiple columns is required
export class Session implements ISession {
  // @Index({ unique: true }) // can mark column or columns to be unique
  @Index() // Use it on a column when an index on a single column is needed
  @Column('bigint')
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';
}
