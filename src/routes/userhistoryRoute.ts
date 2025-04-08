import express from 'express';
import { addToHistory, getUserHistory, clearHistory } from '../services/userhistory';

const userhistory = express.Router();

userhistory.post('/', async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const history = await addToHistory(userId, postId);
    res.json(history);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

userhistory.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const history = await getUserHistory(userId);
    res.json(history);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

userhistory.delete('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    await clearHistory(userId);
    res.json({ message: 'History cleared' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default userhistory;
