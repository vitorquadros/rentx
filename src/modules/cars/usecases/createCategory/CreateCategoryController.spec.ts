import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
       VALUES('${id}', 'admin', 'admin@test.com', '${password}', true, 'now()', 'XXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  test('Should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@test.com', password: 'admin' });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'test description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  test('Should not be able to create a new category with an already registered name', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@test.com', password: 'admin' });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'test description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
