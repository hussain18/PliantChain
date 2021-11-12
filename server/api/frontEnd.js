const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

//auth asset
const authenticateToken = auth.authenticateToken;

// Routers
router.get('/user', authenticateToken, (req, res) => {
  const username = req.user.name;
  db.user.getUser(username).then((user) => res.json(user));
});

router.get('/employees', authenticateToken, (req, res) => {
  const username = req.user.name;

  console.log('TEST isORG: ', isOrg(username)); //test...
  if (!isOrg(username)) return res.sendStatus(400);

  db.employee
    .getOrgEmployees(username)
    .then((employees) => res.json(employees));
});

router.get('/structure', authenticateToken, (req, res) => {
  const username = req.user.name;
  if (!isOrg(username)) res.sendStatus(400);

  db.orgStructure
    .getStructure(username)
    .then((structure) => res.json(structure));
});

//TODO: check for right org
router.post('/structure', authenticateToken, (req, res) => {
  const username = req.user.name;
  const structureBody = req.body;
  if (!isOrg(username)) res.sendStatus(400);

  db.orgStructure.getStructure(username).then((structure) => {
    console.log('TEST structure', structure); //test...
    if (!structure) return db.orgStructure.createStructure(structureBody);
    return db.orgStructure.updateStructure(structureBody);
  });
});

router.post('/project', authenticateToken, (req, res) => {
  const username = req.user.name;
  const projectName = req.body.projectName;
  const orgUsername = req.body.orgUsername;

  if (username !== orgUsername) return res.sendStatus(400);
  if (!isOrg(username)) return res.sendStatus(400);

  db.project.getProject(projectName).then((project) => {
    if (!project) return db.project.createProject(project);
    return res.res(400); // TODO: create an update functionality
  });
});

router.get('/projects', authenticateToken, (req, res) => {
  const username = req.user.name;
  if (!isOrg(username)) res.sendStatus(400);

  db.project.getOrgProjects(username).then((projects) => res.json(projects));
});

router.get('/project/:projectName', authenticateToken, (req, res) => {
  const username = req.user.name;
  const projectName = req.params.projectName;

  if (!isOrg(username)) return res.sendStatus(400);

  db.project.getProject(projectName).then((project) => res.json(project));
});

// Helpers
const isOrg = async (username) => {
  const user = await db.user.getUser(username);
  return user.type === '1';
};

module.exports = router;
