import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserProfile = 'admin' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  perfil: UserProfile;
}
