import resume from "../assets/resumeData"

export function matchJD(jdText) {

  const jd = jdText.toLowerCase()

  const matched = []
  const missing = []

  const resumeSkills =
    resume.skillList.map(
      skill => skill.toLowerCase()
    )

  const jdSkills = resumeSkills.filter(
    skill => jd.includes(skill)
  )

  const allMentioned = resumeSkills
    .concat(
      jd.split(/[\s,.()\/\n]+/)
        .map(w => w.toLowerCase())
        .filter(w =>
          w.length > 2 &&
          !resumeSkills.includes(w)
        )
    )
    .filter(skill => jd.includes(skill))

  allMentioned.forEach(skill => {

    if (resumeSkills.includes(skill)) {
      if (!matched.includes(skill))
        matched.push(skill)
    } else {
      if (!missing.includes(skill))
        missing.push(skill)
    }

  })

  const total =
    matched.length + missing.length

  const score =
    total === 0
      ? 0
      : Math.round(
          (matched.length / total) * 100
        )

  return {
    score,
    matched,
    missing
  }
}