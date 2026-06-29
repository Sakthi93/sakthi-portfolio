import resume from "../assets/resumeData"

const KNOWN_SKILLS = [
  "python", "django", "fastapi", "flask",
  "vue.js", "vue", "react.js", "react", "next.js", "angular", "svelte",
  "node.js", "express", "typescript", "javascript",
  "aws", "lambda", "s3", "sqs", "sns", "ses", "dynamodb", "glue",
  "athena", "redshift", "cloudwatch", "cloudfront", "appflow",
  "step functions", "ec2", "ecs", "eks", "rds", "cloudformation",
  "docker", "kubernetes", "terraform", "ansible", "jenkins",
  "github actions", "gitlab ci", "circleci",
  "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "sqlite",
  "rabbitmq", "celery", "kafka",
  "rest", "graphql", "grpc",
  "jwt", "oauth2", "oauth",
  "microservices", "git", "github", "gitlab",
  "linux", "nginx", "apache"
]

export function matchJD(jdText) {

  const jd = jdText.toLowerCase()

  const matched = []
  const missing = []

const resumeSkills = Array.isArray(resume.skills)
  ? resume.skills
  : typeof resume.skills === "string"
    ? resume.skills.split(",").map(s => s.trim())
    : [];

const normalizedSkills = resumeSkills.map(skill => skill.toLowerCase());
console.log("Resume Skills:", normalizedSkills);

KNOWN_SKILLS.forEach(skill => {
  const skillLower = skill.toLowerCase();

  if (!jd.toLowerCase().includes(skillLower)) return;

  if (normalizedSkills.includes(skillLower)) {
    if (!matched.includes(skill))
      matched.push(skill);
  } else {
    if (!missing.includes(skill))
      missing.push(skill);
  }
});


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