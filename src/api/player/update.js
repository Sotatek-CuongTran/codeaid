// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";

export default async (req, res) => {
  const { id } = req.params;
  const playerUpdateInfo = {
    name: req.body.name,
    position: req.body.position,
  };
  const skillUpdateInfo = req.body.playerSkills;
  // delete all old skills, is it needed?
  await model.PlayerSkill.destroy({ where: { playerId: id } });

  for (const skill of skillUpdateInfo) {
    await model.PlayerSkill.create({
      skill: skill.skill,
      value: skill.value,
      playerId: id,
    });
    // await model.PlayerSkill.update(skill, { where: { skill: skill.skill, playerId: id } });
  }

  await model.Player.update(playerUpdateInfo, { where: { id } });

  const player = await model.Player.findOne(
    {
      include: [model.PlayerSkill],
    },
    { where: { id } }
  );
  res.send(player).status(200);
};
