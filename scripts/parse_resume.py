import re
import json
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
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text


def extract_section(text, *headers):
    """Extract text between a matched header and the next section."""
    pattern = "|".join(re.escape(h) for h in headers)
    match = re.search(
        rf"({pattern})\s*\n(.*?)(?=\n[A-Z][A-Z\s]{{3,}}\n|\Z)",
        text, re.DOTALL | re.IGNORECASE
    )
    return match.group(2).strip() if match else ""


def extract_skills(text):
    found = []
    lower = text.lower()
    for skill in SKILL_KEYWORDS:
        if skill.lower() in lower and skill not in found:
            found.append(skill)
    return found


def extract_block(text, keyword):
    """Extract a paragraph containing a keyword."""
    for para in text.split("\n\n"):
        if keyword.lower() in para.lower():
            return para.strip()
    return ""


def build_resumedata(text):
    skills_found = extract_skills(text)

    about = extract_section(text, "ABOUT", "PROFILE", "SUMMARY")
    overview = extract_section(text, "OVERVIEW", "PROFESSIONAL SUMMARY")
    skills_text = ", ".join(skills_found)
    aws_text = extract_section(text, "AWS", "CLOUD")
    education = extract_section(text, "EDUCATION")
    experience = extract_section(text, "EXPERIENCE", "WORK EXPERIENCE")

    companies = {k: extract_block(text, v) for k, v in COMPANY_KEYS.items()}
    projects = {k: extract_block(text, v) for k, v in PROJECT_KEYS.items()}

    # Fallback: keep existing values if extraction returns empty
    def nonempty(val, fallback):
        return val if val.strip() else fallback

    data = {
        "overview": nonempty(overview, about),
        "experience": nonempty(experience, ""),
        "about": nonempty(about, ""),
        "skills": nonempty(skills_text, ""),
        "aws": nonempty(aws_text, ""),
        "education": nonempty(education, ""),
        "companyList": "",
        "companies": companies,
        "projects": projects,
        "skillList": skills_found,
    }
    return data


def to_js(data):
    def js_str(val):
        if "\n" in val:
            escaped = val.replace("`", "\\`")
            return f"`\n{escaped}\n`"
        return json.dumps(val)

    companies_js = "\n".join(
        f"    {k}: {js_str(v)}," for k, v in data["companies"].items()
    )
    projects_js = "\n".join(
        f"    {k}: {js_str(v)}," for k, v in data["projects"].items()
    )
    skill_list_js = json.dumps(data["skillList"], indent=4)

    return f"""export default {{
  overview: {js_str(data['overview'])},
  experience: {js_str(data['experience'])},
  about: {js_str(data['about'])},
  skills: {js_str(data['skills'])},
  aws: {js_str(data['aws'])},
  education: {js_str(data['education'])},
  companyList: {js_str(data['companyList'])},
  companies: {{
{companies_js}
  }},
  projects: {{
{projects_js}
  }},
  skillList: {skill_list_js}
}}
"""


if __name__ == "__main__":
    text = extract_text(PDF_PATH)
    data = build_resumedata(text)
    js = to_js(data)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"✅ {OUT_PATH} updated successfully.")
