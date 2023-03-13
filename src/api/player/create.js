// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";
import { validateCreateAndUpdateData } from "./utils";

export default async (req, res) => {
  const skills = req.body.playerSkills;
  const position = req.body.position;
  const validate = validateCreateAndUpdateData(skills, position);
  if (!validate.ok) {
    res.status(validate.code).send(validate.message);
    return;
  }

  // check user exists
  const existsPlayer = await model.Player.findOne({
    include: [model.PlayerSkill],
    where: {
      name: req.body.name,
      position,
    },
  });
  if (existsPlayer) {
    res
      .send({
        message: "Player already exists",
      })
      .status(200);

    return;
  }

  const player = await model.Player.create({
    name: req.body.name,
    position: req.body.position,
  });

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

  res.status(201).send(createdUser);
};
