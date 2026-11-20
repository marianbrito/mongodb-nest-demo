import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';

// The URLs of the API. Every route calls one method of the service.
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post() // POST /books
  create(@Body() book: Book) {
    return this.booksService.create(book);
  }

  @Get() // GET /books
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id') // GET /books/:id
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id') // PATCH /books/:id
  update(@Param('id') id: string, @Body() changes: Partial<Book>) {
    return this.booksService.update(id, changes);
  }

  @Delete(':id') // DELETE /books/:id
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
