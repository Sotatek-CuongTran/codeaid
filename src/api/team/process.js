// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import model from "../../db/model/index";
import sequelize from "../../db/index";

export default async (req, res) => {
  try {
    const team = await selectTeam(req.body);
    res.send(team).status(200);
  } catch (error) {
    console.log("🚀 ~ file: process.js:13 ~ error:", error)
    res.status(422).send({
      message: error.message,
    });
  }
};

export async function selectTeam(conditions) {
  await mockCreateSomePlayers();
  validateData(conditions);

  // for and find max value of main skill
  const team = [];
  for (const condition of conditions) {
    const rawQuery = `select players.id as playerId from players inner join playerSkills on players.id = playerSkills.playerId where players.position = '${condition.position}' and playerSkills.skill = '${condition.mainSkill}' group by players.id order by MAX(playerSkills.value) desc limit ${condition.numberOfPlayers}`;

    const bestPlayerIds = (await sequelize.query(rawQuery))[0].map(
      (player) => player.playerId
    );
    const remainPlayerToFind = condition.numberOfPlayers - bestPlayerIds.length;
    if (remainPlayerToFind > 0) {
      const listIdStr = bestPlayerIds.map((id) => `'${id}'`).join(",");
      const replacementQuery = `select players.id as playerId from players inner join playerSkills on players.id = playerSkills.playerId where players.position = '${condition.position}' and players.id not in (${listIdStr}) group by players.id order by MAX(playerSkills.value) desc limit ${remainPlayerToFind}`;
      bestPlayerIds = [
        ...bestPlayerIds,
        ...(await sequelize.query(replacementQuery))[0].map(
          (player) => player.playerId
        ),
      ];
    }

    if (bestPlayerIds.length !== condition.numberOfPlayers) {
      const errText = `Insufficient number of players for position: ${condition.position}`;
      throw new Error(errText);
    }

    // get all playerId infor
    const bestPlayers = await model.Player.findAll({
      include: [
        {
          model: model.PlayerSkill,
        },
      ],
      where: {
        id: bestPlayerIds,
      },
    });
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

const mockCreateSomePlayers = async () => {
  const players = [
    {
      name: "player 1",
      position: "defender",
      playerSkills: [
        {
          skill: "strength",
          value: 100,
        },
        {
          skill: "speed",
          value: 100,
        },
      ],
    },
    {
      name: "player 1",
      position: "defender",
      playerSkills: [
        {
          skill: "strength",
          value: 100,
        },
        {
          skill: "speed",
          value: 50,
        },
      ],
    },
    {
      name: "player 6",
      position: "defender",
      playerSkills: [
        {
          skill: "attack",
          value: 110,
        },
        {
          skill: "speed",
          value: 120,
        },
      ],
    },
    {
      name: "player 2",
      position: "midfielder",
      playerSkills: [
        {
          skill: "strength",
          value: 150,
        },
        {
          skill: "speed",
          value: 60,
        },
        {
          skill: "stamina",
          value: 200,
        },
      ],
    },
    {
      name: "player 4",
      position: "midfielder",
      playerSkills: [
        {
          skill: "strength",
          value: 150,
        },
        {
          skill: "speed",
          value: 90,
        },
        {
          skill: "stamina",
          value: 200,
        },
      ],
    },
    {
      name: "player 3",
      position: "forward",
      playerSkills: [
        {
          skill: "strength",
          value: 120,
        },
        {
          skill: "speed",
          value: 90,
        },
        {
          skill: "defense",
          value: 150,
        },
      ],
    },
    {
      name: "player 5",
      position: "forward",
      playerSkills: [
        {
          skill: "strength",
          value: 100,
        },
        {
          skill: "speed",
          value: 80,
        },
        {
          skill: "defense",
          value: 130,
        },
      ],
    },
  ];

  for (const player of players) {
    const record = await model.Player.create({
      name: player.name,
      position: player.position,
    });

    for (const skill of player.playerSkills) {
      await model.PlayerSkill.create({
        skill: skill.skill,
        value: skill.value,
        playerId: record.id,
      });
    }
  }
};
