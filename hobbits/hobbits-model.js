const db = require("../data/config")

async function create(data) {
	return null
}

async function update(id, data) {
	return null
}

function remove(id) {
	return null
}

function find() {
	return db("hobbits")
}

function findById(id) {
	return null
}

module.exports = {
	create,
	update,
	remove,
	find,
	findById,
}
