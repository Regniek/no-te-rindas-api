import { IsNotEmpty, MinLength } from "class-validator";

export class CreateActivityDto {
    @IsNotEmpty()
    @MinLength(3)
    category: string;

    @IsNotEmpty()
    @MinLength(2)
    lang: string;

    @IsNotEmpty()
    @MinLength(8)
    name: string;

    @IsNotEmpty()
    @MinLength(8)
    description: string;

    @IsNotEmpty()
    @MinLength(8)
    type: string;

    @IsNotEmpty()
    qualification: number;


}