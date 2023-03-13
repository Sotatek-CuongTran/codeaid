// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";

export default async (req, res) => {
  const player = await model.Player.create({
    name: req.body.name,
    position: req.body.position,
  });
  const skills = req.body.playerSkills;
  for (const skill of skills) {
    await model.PlayerSkill.create({
      skill: skill.skill,
      value: skill.value,
      playerId: player.id,
    });
  }

  const createdUser = await model.Player.findOne(
    {
      include: [model.PlayerSkill],
    },
    { where: { id: player.id } }
  );

  res.send(createdUser).status(201);
};
