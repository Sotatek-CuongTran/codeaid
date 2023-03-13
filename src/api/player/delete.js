// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import model from "../../db/model/index";

export default async (req, res) => {
  const { id } = req.params;
  const deletedPlayer = await model.Player.destroy({
    where: { id },
    include: [{ model: model.PlayerSkill }],
  });

  res.send(deletedPlayer).status(200);
}
