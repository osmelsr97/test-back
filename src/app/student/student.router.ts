import { Body, Controller, Delete, Get, Post, Put, Query, Route, Tags, SuccessResponse, Res, TsoaResponse } from 'tsoa';
import { getAllStudents, getStudent, createStudent, updateStudent, deleteStudents } from './student.service';

@Tags('Student')
@Route('/api/student')
export class StudentController extends Controller {

  @Get('/get-all/')
  public async getAllStudents() {
    return getAllStudents()
  }

  @Get('/get/{id}/')
  public async getStudent(@Query('id') id: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>) {
    return getStudent(id, badRequestResponse)
  }

  @Post('/create/')
  @SuccessResponse(201, 'Created')
  public async createStudent(@Res() badRequestResponse: TsoaResponse<400, { message: string }>, @Body() body:
    { firstName: string, lastName: string, email: string, age: number, gradeId: string }) {
    return createStudent(body, badRequestResponse);
  }

  @Put('/update/')
  public async updateStudent(@Query('id') id: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Body() body:
      { firstName: string, lastName: string, email: string, age: number, gradeId: string }) {
    return updateStudent(id, body, badRequestResponse);
  }

  @Delete('/delete/')
  public async deleteStudents(@Body() body: { ids: string[] },
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>) {
    return deleteStudents(body, badRequestResponse);
  }

}

