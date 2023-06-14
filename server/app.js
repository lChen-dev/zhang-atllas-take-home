const express = require('express');
const bodyParser = require('body-parser');
const { Agent, Review } = require('./model');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/agents', async (_, res) => {
  const agents = await Agent.findAll();
  res.json(agents);
});

app.get('/agent', async (req, res) => {
  const id = Number(req.query.id);
  try {
    const agent = await Agent.findOne({ where: { id: id } });
    const reviews = await Review.findAll({ where: {agentId: id}});
    res.status(200).json({ agent, reviews });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.post('/register', async (req, res) => {
  const newInfo = req.body;
  try {
    const agent = await Agent.create(newInfo);
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.post('/add-review', async (req, res) => {
  const newReviewInfo = req.body;
  try {
    const result = await Review.create({
      agentId: Number(newReviewInfo.agentId),
      ...newReviewInfo
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = app;
