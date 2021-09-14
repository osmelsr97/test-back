import { TsoaResponse } from 'tsoa';
import { Grade } from '@entity/grade';

export const getAllGrade = async () => {
  try {
    return await Grade.find({ order: { name: 'ASC' } });
  } catch (e) {
    console.error(e);
  }
}
export const getGrade = async (id: string, badRequestResponse: TsoaResponse<400, { message: string }>) => {
  try {
    const _grade = await Grade.findOne({ where: { id } });
    if (!_grade) {
      return badRequestResponse(400, { message: 'Grade is nt  found!' });
    }
    return _grade;
  } catch (e) {
    console.error(e);
  }
}

export const createGrade = async ({ grade }: { grade: string }) => {
  try {
    const _newGrade = new Grade();
    _newGrade['name'] = grade;
    return await _newGrade.save();

  } catch (e) {
    console.error(e);
  }
}

export const updateGrade = async ({ id }: { id: string }, { grade }: { grade: string }) => {
  try {
    const _updateGrade = await Grade.findOne({ where: { id } });
    if (!_updateGrade) return { message: "Grade is not found!" };

    if (_updateGrade['name'] !== grade) {
      _updateGrade['name'] = grade;
      await _updateGrade.save();
    } else {
      return _updateGrade;
    }

    return await Grade.findOne({
      where: { id },
    });

  } catch (e) {
    console.error(e);
  }
}

export const deleteGrade = async ({ id }: { id: string }) => {
  try {
    const foundGrade = await Grade.findOne({ id: id });
    return await foundGrade?.remove();
  } catch (e) {
    console.error(e);
  }
}