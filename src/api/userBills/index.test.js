import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { UserBills } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, userBills

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  userBills = await UserBills.create({ user })
})

test('POST /user-bills 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, userId: 'test', amount: 'test', chapati: 'test', salan: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.chapati).toEqual('test')
  expect(body.salan).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /user-bills 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /user-bills 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /user-bills 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /user-bills/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${userBills.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(userBills.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /user-bills/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${userBills.id}`)
  expect(status).toBe(401)
})

test('GET /user-bills/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /user-bills/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${userBills.id}`)
    .send({ access_token: userSession, userId: 'test', amount: 'test', chapati: 'test', salan: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(userBills.id)
  expect(body.userId).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.chapati).toEqual('test')
  expect(body.salan).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /user-bills/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${userBills.id}`)
    .send({ access_token: anotherSession, userId: 'test', amount: 'test', chapati: 'test', salan: 'test' })
  expect(status).toBe(401)
})

test('PUT /user-bills/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${userBills.id}`)
  expect(status).toBe(401)
})

test('PUT /user-bills/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', amount: 'test', chapati: 'test', salan: 'test' })
  expect(status).toBe(404)
})

test('DELETE /user-bills/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userBills.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /user-bills/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userBills.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /user-bills/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userBills.id}`)
  expect(status).toBe(401)
})

test('DELETE /user-bills/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
