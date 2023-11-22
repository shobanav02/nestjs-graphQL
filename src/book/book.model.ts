import { Optional } from "@nestjs/common";
import { Field ,ObjectType ,ID} from "@nestjs/graphql";
import { Prop , Schema , SchemaFactory  } from '@nestjs/mongoose'
import { Document } from 'mongoose';

export type BookDocument = Book & Document; 

@ObjectType()
@Schema()

export class Book {
     @Field()
     _id: string

     @Field()
     @Prop({ required: true })
     title: string;

     @Field()
     @Prop({ required: true })
     author: string;

     @Field()
     @Prop({ required: true })
     publishedDate: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);