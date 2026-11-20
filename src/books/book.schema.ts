import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// One document in the "books" collection.
@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  year: number;

  @Prop()
  pages: number;

  // Optional: some books have a rating, some don't.
  @Prop()
  rating: number;

  // An array inside the document, like hobbies in the slides.
  @Prop([String])
  genres: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
