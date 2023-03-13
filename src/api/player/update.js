// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";
import { validateCreateAndUpdateData } from "./utils";

export default async (req, res) => {
  const { id } = req.params;
  const skills = req.body.playerSkills;
  const position = req.body.position;
  const validate = validateCreateAndUpdateData(skills, position);
  if (!validate.ok) {
    res.status(validate.code).send(validate.message);
    return;
  }

  // check user exists
  const existsPlayer = await model.Player.findOne({
    where: { id },
  });
  if (!existsPlayer) {
    res.status(404).send("Player not found");
    return;
  }

  const playerUpdateInfo = {
    name: req.body.name,
    position,
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
  res.status(200).send(player);
};
