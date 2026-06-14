import re
import json
import os
import pdfplumber

PDF_PATH = "public/resume.pdf"
OUT_PATH = "src/assets/resumeData.js"

SKILL_KEYWORDS = [
    "Python", "Django", "FastAPI", "Flask",
    "Vue.js", "React.js", "Next.js", "React", "Vue",
    "AWS", "Lambda", "S3", "Step Functions", "SQS", "SNS", "SES",
    "DynamoDB", "Glue", "Athena", "Redshift", "CloudWatch", "CloudFront", "AppFlow",
    "Docker", "Kubernetes", "Terraform", "GitHub Actions",
    "PostgreSQL", "MySQL", "Redis",
    "JWT", "OAuth2", "Microservices",
    "GitLab", "GitHub",
]

COMPANY_KEYS = {
    "accenture": "accenture",
    "ecgroup": "ec group",
    "talentztech": "talentztech",
}

PROJECT_KEYS = {
    "ipu": "ipu",
    "alexandria": "alexandria",
    "cda": "cda",
    "strategyai": "strategy ai",
    "pinnit": "pinnit",
    "cascader": "cascader",
    "crm": "crm",
}


def extract_text(path):
    pages = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text(x_tolerance=2, y_tolerance=2)
            if text:
                pages.append(text)
    return "\n".join(pages)


def extract_section(text, *headers):
    pattern = "|".join(re.escape(h) for h in headers)
    match = re.search(
        rf"(?:{pattern})\s*\n(.*?)(?=\n[A-Z][A-Z\s]{{3,}}\n|\Z)",
        text, re.DOTALL | re.IGNORECASE
    )
    return match.group(1).strip() if match else ""


def extract_skills(text):
    found = []
    lower = text.lower()
    for skill in SKILL_KEYWORDS:
        if skill.lower() in lower and skill not in found:
            found.append(skill)
    return found


def extract_block(text, keyword):
    for para in text.split("\n\n"):
        if keyword.lower() in para.lower():
            return para.strip()
    return ""


def build_resumedata(text):
    skills_found = extract_skills(text)
    skills_text = ", ".join(skills_found)

    about = extract_section(text, "ABOUT", "PROFILE", "SUMMARY")
    overview = extract_section(text, "OVERVIEW", "PROFESSIONAL SUMMARY")
    aws_text = extract_section(text, "AWS", "CLOUD")
    education = extract_section(text, "EDUCATION")
    experience = extract_section(text, "EXPERIENCE", "WORK EXPERIENCE")

    companies = {k: extract_block(text, v) for k, v in COMPANY_KEYS.items()}
    projects = {k: extract_block(text, v) for k, v in PROJECT_KEYS.items()}

    def nonempty(val, fallback):
        return val if val.strip() else fallback

    return {
        "overview": nonempty(overview, about),
        "experience": nonempty(experience, ""),
        "about": nonempty(about, ""),
        "skills": skills_text,
        "aws": nonempty(aws_text, ""),
        "education": nonempty(education, ""),
        "companyList": "",
        "companies": companies,
        "projects": projects,
        "skillList": skills_found,
    }


def js_val(val):
    if "\n" in val:
        return f"`\n{val}\n`"
    return f'"{val}"'


def to_js(data):
    companies_js = "\n\n".join(
        f"    {k}:\n      {js_val(v)}," for k, v in data["companies"].items()
    )
    projects_js = "\n\n".join(
        f"    {k}:\n      {js_val(v)}," for k, v in data["projects"].items()
    )
    skill_list_js = "\n".join(
        f'      "{s}",' for s in data["skillList"]
    )

    return f"""export default {{
// This file is auto-generated from public/resume.pdf — do not edit manually.
  overview: {js_val(data['overview'])},
  experience:
    {js_val(data['experience'])},
  about:
    {js_val(data['about'])},

  skills:
    {js_val(data['skills'])},

  aws:
    {js_val(data['aws'])},

  education:
    {js_val(data['education'])},

  companyList:
    {js_val(data['companyList'])},

  companies: {{

{companies_js}

  }},

  projects: {{

{projects_js}

  }},

  skillList: [
{skill_list_js}
  ]

}}
"""


if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    text = extract_text(PDF_PATH)
    data = build_resumedata(text)
    js = to_js(data)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"✅ {OUT_PATH} updated successfully.")
