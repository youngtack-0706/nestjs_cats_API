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

    //eager 조인하는 값 모두 가져오기 one쪽에 설정해야함(?)
    @OneToMany(type=>UserAuthority, userAuthority=>userAuthority.user, {eager: true})
    authorities?: any[];
}