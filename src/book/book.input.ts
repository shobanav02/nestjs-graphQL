import { Optional } from "@nestjs/common";
import { InputType, Field ,ID} from "@nestjs/graphql";

@InputType()
export class BookInput {

    @Field()
    title: string;

    @Field()
    author: string;

    @Field()
    publishedDate: boolean

}

@InputType()
export class FindBookInput {
  @Field()
  _id: string;
}