import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";

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

    @OneToMany(type=>UserAuthority, userAuthority=>userAuthority.user, {eager: true})
    authorities?: any[];
}