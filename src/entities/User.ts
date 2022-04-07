import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: new Date() })
  createdOn: Date;

  @Column({ default: new Date() })
  updatedOn: Date;
}
