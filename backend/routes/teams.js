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

router.get('/invitations', async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await User.findOne({ uid });
        // console.log('user:', user);
        const teams = await Team.find({ invitedUsers: user.email });
        // console.log('teams:', teams);
        res.status(200).json(teams);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/singleteam/:teamId', async (req, res) => {
    try {
        const { uid } = req.body;
        const { teamId } = req.params;

        const user = await User.findOne({ uid });
        const team = await Team.findOne({ _id: teamId })
            .populate('users');

        console.log('team:', team);
        res.status(200).json(team);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/invite', async (req, res) => {
    try {
        const { teamId, email } = req.body;
        const updatedTeam = await Team.findOneAndUpdate({ _id: teamId }, { $push: { invitedUsers: email }}, { useFindAndModify: false });
        res.status(200).json(updatedTeam);
    }
    catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;