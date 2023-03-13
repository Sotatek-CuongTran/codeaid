// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import model from "../../db/model/index";
import sequelize from "../../db/index";

export default async (req, res) => {
  const team = await selectTeam(req.body);
  res.send(team).status(200);
};

export async function selectTeam(conditions) {
  validateData(conditions);

  // for and find max value of main skill
  const team = [];
  console.log("🚀 ~ file: process.js:17 ~ selectTeam ~ team:", team);
  for (const condition of conditions) {
    const bestPlayers = await model.Player.findAll({
      include: [
        {
          model: model.PlayerSkill,
          where: {
            skill: condition.mainSkill,
          },
        },
      ],
      // attributes: [
      //   sequelize.fn("max", sequelize.col("PlayerSkill.value")),
      //   "maxValue",
      // ],
      order: [[model.PlayerSkill, "value", "DESC"]],
      group: ["PlayerSkill.playerId"],
      limit: condition.numberOfPlayers,
    });

    if (!bestPlayers) {
      bestPlayers = await model.Player.findAll({
        include: [
          {
            model: model.PlayerSkill,
            attributes
          },
        ],
        // attributes: [
        //   model.PlayerSkill.sequelize.fn(
        //     "max",
        //     model.PlayerSkill.sequelize.col("PlayerSkills.value")
        //   ),
        //   "maxValue",
        // ],
        order: [[model.PlayerSkill, "value", "DESC"]],
        group: [model.PlayerSkill, "playerId"],
        limit: condition.numberOfPlayers,
      });
    }

    if (bestPlayers.length !== condition.numberOfPlayers) {
      const errText = `Insufficient number of players for position: ${condition.position}`;
      throw new Error(errText);
    }
    team.push(...bestPlayers);
  }

  return team;
}

function validateData(conditions) {
  const map = {}; // position -> mainSkill
  const ok = true;
  for (const condition of conditions) {
    const positionData = map[condition.position];
    if (!positionData) {
      return (map[condition.position] = condition.mainSkill);
    }

    if (positionData === condition.mainSkill) {
      return (ok = false);
    }
  }

  return ok;
}
