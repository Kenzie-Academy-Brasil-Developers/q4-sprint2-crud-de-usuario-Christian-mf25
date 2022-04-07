import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";
import { hashSync } from "bcrypt";

dotenv.config();

export class initialCommit1649281140301 implements MigrationInterface {
  name = "initialCommit1649281140301";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "createdOn" TIMESTAMP NOT NULL DEFAULT '"2022-04-06T21:39:03.628Z"', "updatedOn" TIMESTAMP NOT NULL DEFAULT '"2022-04-06T21:39:03.628Z"', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `INSERT INTO "users" 
				("name", "email", "password", "isAdm")
					VALUES (
						'${process.env.ADM_NAME}',
						'${process.env.ADM_EMAIL}',
						'${hashSync(process.env.ADM_PASSWORD, 10)}',
						'true'
					)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
