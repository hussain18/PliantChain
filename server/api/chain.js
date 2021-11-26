const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

//auth asset
const authenticateToken = auth.authenticateToken;

// Routers
router.get(
  '/chain-transaction/:orgAddress/:senderAddress/:receiverAddress',
  authenticateToken,
  async (req, res) => {
    const orgAddress = params.orgAddress;
    const senderAddress = params.senderAddress;
    const receiverAddress = params.receiverAddress;

    if (!orgAddress || !senderAddress || !receiverAddress)
      return res.sendStatus(401);

    const org = await db.user.getUserByAddress(orgAddress);
    const sender = await db.user.getUserByAddress(senderAddress);
    const receiver = await db.user.getUserByAddress(receiverAddress);

    if (!org || !sender || !receiver) return res.json({ allInSystem: 0 });

    // If sender is organization
    if (org.username === sender.username) {
      // check if receiver is in a project
      const userInProject = await db.projStructure.empInStructure(
        org.username,
        receiver.username
      );

      if (userInProject)
        return res.json({
          allInSystem: 1,
          isProject: 1,
          senderAuthority: 1,
          receiverAuthority: userInProject.authorities,
        });

      // check if receiver is in org
      const userInOrg = await db.orgStructure.getStructure(
        org.username,
        receiver.username
      );

      if (!userInOrg) return res.json({ allInSystem: 0 });

      return res.json({
        allInSystem: 1,
        isProject: 0,
        senderAuthority: 1,
        receiverAuthority: userInOrg.authorities,
      });
    }

    // Checking if sender and receiver is in a project structure
    const senderInProject = await db.projStructure.empInStructure(
      org.username,
      sender.username
    );
    const receiverInProject = await db.projStructure.empInStructure(
      org.username,
      receiver.username
    );

    if (!receiverInProject && senderInProject)
      return res.json({ allInSystem: 0 });

    if (senderInProject && receiverInProject) {
      return res.json({
        allInSystem: 1,
        isProject: 1,
        senderAuthority: senderInProject.authorities,
        receiverAuthority: receiverInProject.authorities,
      });
    }

    // Checking if sender and receiver are in organization
    const senderInOrg = await db.orgStructure.getStructure(
      org.username,
      sender.username
    );
    const receiverInOrg = await db.orgStructure.getStructure(
      org.username,
      sender.username
    );

    if (!senderInOrg || !receiverInOrg) return res.json({ allInSystem: 0 });

    return res.send({
      allInSystem: 1,
      isProject: 0,
      senderAuthority: senderInOrg.authorities,
      receiverAuthority: receiverInOrg.authorities,
    });
  }
);

module.exports = router;
