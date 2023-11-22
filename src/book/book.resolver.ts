import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Book } from './book.model';
import { BookService } from './book.service';
import { BookInput ,FindBookInput } from './book.input';
import { Schema as MongooseSchema  } from 'mongoose';

@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Query(() => [Book])
    async books(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Query(() => Book)
    async book(@Args('input') { _id }: FindBookInput): Promise<Book> {
        console.log(_id)
        return this.bookService.findOne(_id);
    }

    @Mutation(() => Book)
    async createBook(@Args('input') input: BookInput): Promise<Book> {
        return this.bookService.create(input);
    }

    @Mutation(() => Book)
    async updateBook(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: BookInput,
    ): Promise<Book> {
        return this.bookService.update(id, input);
    }

    @Mutation(() => Book)
    async deleteBook(@Args('id', { type: () => ID }) id: string): Promise<Book> {
        return this.bookService.delete(id);
    }
}