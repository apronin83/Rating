const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Artifact = require("../models/artifact");
var Group = require("../models/group");

app.get('/artifacts', (req, res) => {
	Artifact.find({}, 'name subartifacts', function (error, artifacts) {
		if (error) { console.error(error); }
		res.send({
			artifacts: artifacts
		})
	}).sort({ _id: -1 })
})

app.get('/groups', (req, res) => {
	Group.find({}, 'name points', function (error, groups) {
		if (error) { console.error(error); }
		res.send({
			groups: groups
		})
	}).sort({ _id: -1 })
})

app.post('/add_artifact', (req, res) => {
	var db = req.db;
	var name = req.body.name;
	var new_artifact = new Artifact({
		name: name,
		subartifacts: []
	})

	new_artifact.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.post('/add_group', (req, res) => {
	var db = req.db;
	var name = req.body.name;
	var new_group = new Group({
		name: name,
		points: []
	})

	new_group.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.put('/artifacts/:id', (req, res) => {
	var db = req.db;
	Artifact.findById(req.params.id, 'name subartifacts', function (error, artifact) {
		if (error) { console.error(error); }

		artifact.name = req.body.name
		artifact.subartifacts = req.body.subartifacts
		artifact.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.put('/groups/:id', (req, res) => {
	var db = req.db;
	Group.findById(req.params.id, 'name points', function (error, group) {
		if (error) { console.error(error); }

		group.name = req.body.name
		group.points = req.body.points
		group.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/artifacts/:id', (req, res) => {
	var db = req.db;
	Artifact.remove({
		_id: req.params.id
	}, function (err, artifact) {
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.delete('/groups/:id', (req, res) => {
	var db = req.db;
	Group.remove({
		_id: req.params.id
	}, function (err, group) {
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/artifacts/:id', (req, res) => {
	var db = req.db;
	Artifact.findById(req.params.id, 'name subartifacts', function (error, artifact) {
		if (error) { console.error(error); }
		res.send(artifact)
	})
})

app.get('/groups/:id', (req, res) => {
	var db = req.db;
	Group.findById(req.params.id, 'name points', function (error, group) {
		if (error) { console.error(error); }
		res.send(group)
	})
})

app.listen(process.env.PORT || 8081)
