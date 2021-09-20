import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'data_gobbler_history' })
export class DataGobbler {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'fileType', enum: ['CSV', 'XML'] })
  fileType: string;

  @Column({ name: 'fileId' })
  fileId: string;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;

  @Column({ name: 'isDeleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: number;
}
