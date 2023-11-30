import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'director', nullable: false })
  director: string;

  @Column({ name: 'release_year', nullable: false })
  releaseYear: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
