import { Body, Controller, Delete, Get, Post, Put, Res, Query, Route, Tags, TsoaResponse } from 'tsoa';
import { getAllGrade, createGrade, updateGrade, deleteGrade, getGrade } from './grade.service';

@Tags('Grade')
@Route('/api/grade')
export class GradeController extends Controller {

  @Get('/get-all/')
  public async getAllGrade() {
    return getAllGrade()
  }

  @Get('/get/')
  public async getGrade(@Query('id') id: string, @Res() badRequestResponse: TsoaResponse<400, { message: string }>) {
    return getGrade(id, badRequestResponse)
  }

  @Post('/create/')
  public async createGrade(@Body() body: { grade: string }) {
    return createGrade(body);
  }

  @Put('/update/{id}/')
  public async updateGrade(@Query('id') id: string, @Body() body: { grade: string }) {
    return updateGrade({ id }, body);
  }

  @Delete('/delete/{id}/')
  public async deleteGrade(@Query('id') id: string) {
    return deleteGrade({ id });
  }

}

