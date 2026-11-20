import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // Connects to the MongoDB container from docker-compose.yml.
    // "library" is the database name. It is created automatically.
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    BooksModule,
  ],
})
export class AppModule {}
