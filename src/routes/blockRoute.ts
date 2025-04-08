import express from 'express';
import { blockUser, unblockUser, getBlockedUsers } from '../services/blockservice';

const blockRouter = express.Router();

blockRouter.post('/block', async (req, res) => {
  try {
    const { blockerId, blockedId } = req.body;
    const result = await blockUser(blockerId, blockedId);
    res.json({ message: 'User blocked', result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

blockRouter.post('/unblock', async (req, res) => {
  try {
    const { blockerId, blockedId } = req.body;
    await unblockUser(blockerId, blockedId);
    res.json({ message: 'User unblocked' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

blockRouter.get('/blocked/:blockerId', async (req, res) => {
  try {
    const blockerId = parseInt(req.params.blockerId);
    const blockedUsers = await getBlockedUsers(blockerId);
    res.json(blockedUsers);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default blockRouter;
