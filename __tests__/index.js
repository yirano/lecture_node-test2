const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

// a global jest hook to run before each individual test
beforeEach(async () => {
	// re-run the seeds and start with a fresh database for each test
	await db.seed.run()
})

// a global jest hook to run after all the tests are done
afterAll(async () => {
	// closes the database connection so the jest command doesn't stall
	await db.destroy()
})

describe("hobbits integration tests", () => {
	it("GET /", async () => {
		const res = await supertest(server).get("/")
		expect(res.statusCode).toBe(200)
		// `content-type` headers tell the client how to render the data
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.message).toBe("Welcome to our API")
	})

	it("GET /hobbits", async () => {
		const res = await supertest(server).get("/hobbits")
		expect(res.statusCode).toBe(200)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body).toHaveLength(4)
		expect(res.body[0].name).toBe("sam")
	})

	it("GET /hobbits/:id", async () => {
		const res = await supertest(server).get("/hobbits/2")
		expect(res.statusCode).toBe(200)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.id).toBe(2)
		expect(res.body.name).toBe("frodo")
	})

	it("GET /hobbits/:id (not found)", async () => {
		const res = await supertest(server).get("/hobbits/50")
		expect(res.statusCode).toBe(404)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.message).toBe("Hobbit not found")
	})

	it("POST /hobbits", async () => {
		const res = await supertest(server)
			.post("/hobbits")
			.send({ name: "bilbo" })
		expect(res.statusCode).toBe(201)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.id).toBeDefined()
		expect(res.body.name).toBe("bilbo")
	})
})
