import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    // ColumnTypeUndefinedError: Column type for User#firstName is not defined and cannot be guessed
    ///// fixed after adding column type
    /// [ @Column('text',{nullable:true}) ]
    @Column('text')
    firstName: string

    @Column('text')
    lastName: string

    @Column('text')
    age: number

}
