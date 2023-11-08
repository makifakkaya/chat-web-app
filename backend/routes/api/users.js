const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../config/auth');

router.get('/list', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return !user ? res.sendStatus(404) : res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
});

router.put('/:id', auth, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'role'];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ error: `Invalid updates: ${validationErrors.join(',')}` });

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
    updates.forEach(update => {
      user[update] = req.body[update];
    });
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.sendStatus(404);

    return res.send({ message: 'User Deleted' });
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;