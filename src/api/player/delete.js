// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";

export default async (req, res) => {
  const { id } = req.params;
  // check user exists
  const existsPlayer = await model.Player.findOne({
    where: { id },
  });
  if (!existsPlayer) {
    res.status(404).send("Player not found");
    return;
  }

  const deletedPlayer = await model.Player.destroy({
    where: { id },
    include: [{ model: model.PlayerSkill }],
  });

  res.status(200).send(deletedPlayer);
};
