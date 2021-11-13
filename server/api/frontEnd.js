const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

//auth asset
const authenticateToken = auth.authenticateToken;

// Routers
router.get('/user', authenticateToken, (req, res) => {
  const username = req.user.name;
  db.user
    .getUser(username)
    .then((user) => res.json(user))
    .catch((err) => res.sendStatus(500));
});

router.get('/employees', authenticateToken, (req, res) => {
  const username = req.user.name;

  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.employee.getOrgEmployees(username))
    .then((employees) => res.json(employees))
    .catch((err) => res.sendStatus(500));
});

router.get('/structure', authenticateToken, (req, res) => {
  const username = req.user.name;
  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.orgStructure.getOrgStructure(username))
    .then((structure) => res.json(structure))
    .catch((err) => res.sendStatus(500));
});

router.post('/structure', authenticateToken, (req, res) => {
  const username = req.user.name;
  const structureBody = req.body;
  const empUsername = structureBody.empUsername;
  if (structureBody.orgUsername !== username) return res.sendStatus(400);

  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.orgStructure.getStructure(username, empUsername))
    .then((structure) => {
      if (!structure) return db.orgStructure.createStructure(structureBody);
      return db.orgStructure.updateStructure(username, structureBody);
    })
    .then(() => res.json({ success: true }))
    .catch((err) => res.sendStatus(500));
});

router.post('/project', authenticateToken, (req, res) => {
  const username = req.user.name;
  const projectName = req.body.projectName;
  const orgUsername = req.body.orgUsername;

  if (username !== orgUsername) return res.sendStatus(400);
  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.project.getProject(projectName))
    .then((project) => {
      if (!project) return db.project.createProject(req.body);
      return res.sendStatus(400);
    })
    .catch((err) => res.sendStatus(500));
});

router.get('/projects', authenticateToken, (req, res) => {
  const username = req.user.name;

  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.project.getOrgProjects(username))
    .then((projects) => res.json(projects))
    .catch((err) => res.sendStatus(500));
});

router.get('/project/:projectName', authenticateToken, (req, res) => {
  const username = req.user.name;
  const projectName = req.params.projectName;

  isOrg(username)
    .then((conf) => {
      if (!conf) return res.sendStatus(400);
    })
    .then(() => db.project.getProject(username, projectName))
    .then((project) => res.json(project))
    .catch((err) => res.sendStatus(500));
});

// Helpers
const isOrg = async (username) => {
  const user = await db.user.getUser(username);
  return user.type === '1';
};

const isEmpAlreadyInStr = async (orgUsername, empUsername) => {
  const structure = await db.orgStructure.getStructure(
    orgUsername,
    empUsername
  );

  return structure;
};

module.exports = router;
