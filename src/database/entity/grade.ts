import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Student } from './student';

@Entity({ name: 'grade' })
export class Grade extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Student, (student: Student) => student.grade, { onDelete: 'CASCADE' })
  student: Student;

}