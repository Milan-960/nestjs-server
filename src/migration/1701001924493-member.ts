import { MigrationInterface, QueryRunner } from 'typeorm';

export class Member1701001924493 implements MigrationInterface {
  name = 'Member1701001924493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" ADD "surname" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "surname"`);
  }
}
