// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";

export default async (req, res) => {
  const listPlayers = await model.Player.findAll({
    include: [model.PlayerSkill],
  });
  res.send(listPlayers).status(200);
};
