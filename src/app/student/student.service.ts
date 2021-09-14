import { Grade } from '@entity/grade';
import { Student } from '@entity/student';
import { TsoaResponse } from '@tsoa/runtime';

export const getAllStudents = async () => {
  try {
    return { students: await Student.find({ order: { firstName: 'ASC' }, relations: ['grade'] }) }
  } catch (e) {
    console.error(e);
  }
}

export const getStudent = async (id: string, badRequest: TsoaResponse<400, { message: string }>) => {
  try {
    const _student = await Student.findOne({ where: { id }, relations: ['grade'] });
    if (!_student) {
      return badRequest(400, { message: "Student is not found!" })
    }
    return _student;

  } catch (e) {
    console.error(e);
  }
}

export const createStudent = async ({ firstName, lastName, email, age, gradeId }:
  { firstName: string, lastName: string, email: string, age: number, gradeId: string },
  badRequest: TsoaResponse<400, { message: string }>) => {
  try {
    const _emailInUse = await Student.findOne({ where: { email } });
    if (_emailInUse) {
      return badRequest(400, { message: "Email provided is already in use!" });
    }

    const _newStudent = new Student();
    _newStudent['firstName'] = firstName;
    _newStudent['lastName'] = lastName;
    _newStudent['email'] = email;
    _newStudent['age'] = age;

    const _studentGrade = await Grade.findOne({ where: { id: gradeId } });
    if (!_studentGrade) {
      return badRequest(400, { message: "Grade is not found!" });
    }

    await _newStudent.save();
    _newStudent['grade'] = _studentGrade;
    await _newStudent.save();

    return await Student.findOne({
      where: { email: email },
      relations: ['grade']
    });

  } catch (e) {
    console.error(e);
  }
}

export const updateStudent = async (
  id: string,
  { firstName, lastName, email, age, gradeId }:
    { firstName: string, lastName: string, email: string, age: number, gradeId: string },
  badRequest: TsoaResponse<400, { message: string }>) => {
  try {
    const _updateStudent = await Student.findOne({ where: { id }, relations: ['grade'] });
    if (!_updateStudent) return badRequest(400, { message: "Student is not found!" });
    _updateStudent['firstName'] = firstName;
    _updateStudent['lastName'] = lastName;
    _updateStudent['email'] = email;
    _updateStudent['email'] = email;
    _updateStudent['age'] = age;
    await _updateStudent.save();

    const _studentGrade = await Grade.findOne({ where: { id: gradeId } });
    if (!_studentGrade) {
      return badRequest(400, { message: "Grade is not found!" });
    } else {
      _updateStudent['grade'] = _studentGrade;
      await _updateStudent.save();
    }

    return await Student.findOne({
      where: { email: email },
      relations: ['grade']
    });

  } catch (e) {
    console.error(e);
  }
}

export const deleteStudents = async ({ ids }: { ids: string[] }, badRequest: TsoaResponse<400, { message: string }>) => {
  try {
    const _students = await Student.findByIds(ids, { relations: ['grade'] });
    if (!_students) return badRequest(400, { message: "Student is not found!" });
    return await Student.remove(_students);
  } catch (e) {

    console.error(e);
  }
}