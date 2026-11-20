import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Book } from './book.schema';

// Each method is one of the mongosh commands from the slides.
@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // db.books.insertOne({ ... })
  create(book: Book) {
    return this.bookModel.create(book);
  }

  // db.books.find()
  findAll() {
    return this.bookModel.find();
  }

  // db.books.findOne({ _id: ... })
  async findOne(id: string) {
    const book = isValidObjectId(id) ? await this.bookModel.findById(id) : null;
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  // db.books.updateOne({ _id: ... }, { $set: { ... } })
  async update(id: string, changes: Partial<Book>) {
    await this.findOne(id);
    return this.bookModel.findByIdAndUpdate(id, changes, { returnDocument: 'after' });
  }

  // db.books.deleteOne({ _id: ... })
  async remove(id: string) {
    await this.findOne(id);
    return this.bookModel.findByIdAndDelete(id);
  }
}
