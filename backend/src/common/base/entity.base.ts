import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDomain } from './domain.base';

export class BaseEntity implements BaseDomain {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
