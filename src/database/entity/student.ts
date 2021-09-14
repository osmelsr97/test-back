import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, OneToOne, ManyToOne } from "typeorm";
import { Grade } from "./grade";

@Entity({ name: 'student' })
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  age: number;

  @ManyToOne(() => Grade, (grade: Grade) => grade.name, { onDelete: 'CASCADE' })
  grade: Grade;

}