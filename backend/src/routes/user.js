import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// router.get('/:userId', async (req, res) => {
//   const user = await req.context.models.User.findByPk(
//     req.params.userId,
//   );
//   return res.send(user);
// });

router.post('/', async (req, res) => {
  console.log(">>>>>>>>")
  const sender = await req.context.models.User.create({
    username: req.body.username,
  });

  return res.send(sender);
});

router.delete('/:username', async (req, res) => {
  console.log("<<<<<<<< deleting")
  const result = await req.context.models.User.destroy({
    where: { username: req.params.username },
  });

  return res.send(true);
});

export default router;
