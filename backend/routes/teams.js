const express = require('express');
const router = express.Router();
// Import MongoDB models:
const User = require('../schemas/User');
const Team = require('../schemas/Team');

router.get('/', async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await User.findOne({ uid });
        // console.log('user:', user);
        const teams = await Team.find({ users: user._id });
        // console.log('teams:', teams);
        res.status(200).json(teams);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/singleteam/:teamId', async (req, res) => {
    try {
        const { uid } = req.body;
        const { teamId } = req.params;

        const user = await User.findOne({ uid });
        const team = await Team.find({ _id: teamId }, { users: user._id}).select('name users adminUsers');
        console.log('team:', team);
        res.status(200).json(team);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;