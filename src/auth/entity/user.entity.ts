import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{
    static findOne(arg0: { id: any; }, arg1: (err: any, user: any) => any) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}