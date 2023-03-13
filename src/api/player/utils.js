export const availablePosistions = ["defender", "midfielder", "forward"];
export const availableSkills = ["defense", "attack", "speed", "strength", "stamina"];

export function isValidPosition(position) {
  return availablePosistions.includes(position);
}

export function isValidSkill(skill) {
  return availableSkills.includes(skill);
}

export function validateCreateAndUpdateData(skills, position) {
  if (!isValidPosition(position)) {
    return {
      ok: false,
      message: "Invalid value for position: " + position,
      code: 422,
    };
  }

  if (!skills.length) {
    return {
      ok: false,
      message: "Not have any skills",
      code: 422,
    };
  }

  for (const skill of skills) {
    if (!skill.skill || !skill.value) {
      return {
        ok: false,
        message: "Skill empty",
        code: 422,
      };
    }
    
    if (!isValidSkill(skill.skill)) {
      return {
        ok: false,
        message: "Invalid value for skill: " + skill.skill,
        code: 422,
      };
    }
  }

  return {
    ok: true,
  }
}