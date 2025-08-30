import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/roles.enum'; // 1. Import the Role enum

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  // ✅ --- ADD THE ROLE COLUMN ---
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User, // 2. Set the default role to 'user'
  })
  role: Role;
}