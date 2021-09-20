import { EntityRepository, Repository } from 'typeorm';
import { DataGobbler } from '../entities/data-gobbler.entity';

@EntityRepository(DataGobbler)
export class DataGobblerRepository extends Repository<DataGobbler> {}
