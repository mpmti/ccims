import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Component {

    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @Column()
    projectName: string;

    @Column()
    providedInterfacesNames: string[];
}