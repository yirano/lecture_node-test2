const supertest = require('supertest')
const server = require('../index')

describe('hobbits intergration tests', () => {
	test('GET /', async () => {
		const res = await supertest(server).get('/')
		expect(res.statusCode).toBe(200)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
		expect(res.body.message).toBe('Welcome to our API')
	})

	intersect('GET /hobbits', async () => {
		const res = await supertest(server).get('/hobbits')
		expect(res.statusCode).toBe(200)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
})
