<template>
  <section id="experience">

    <h1>Experience</h1>

    <!-- Companies -->

    <h2>Companies</h2>

    <div class="grid">

      <div
        v-for="company in companies"
        :key="company.name"
        @click="selectCompany(company)"
        :class="['card', { active: selectedCompany?.name === company.name }]"
      >
        <h3>{{ company.name }}</h3>
        <p>{{ company.role }}</p>
      </div>

    </div>

    <!-- Projects -->

    <div v-if="selectedCompany">

      <h2 style="margin-top:40px;">
        Projects at {{ selectedCompany.name }}
      </h2>

      <div class="grid">

        <div
          v-for="project in selectedCompany.projects"
          :key="project.name"
          @click="selectProject(project)"
          :class="['card', { active: selectedProject?.name === project.name }]"
        >
          <h3>{{ project.name }}</h3>
          <p>{{ project.role }}</p>
        </div>

      </div>

    </div>

    <!-- Details -->

    <div
      class="details"
      v-if="selectedProject"
    >

      <h2>{{ selectedProject.name }}</h2>

      <h3>Role</h3>

      <p>{{ selectedProject.role }}</p>

      <h3>Responsibilities</h3>

      <ul>
        <li
          v-for="work in selectedProject.work"
          :key="work"
        >
          {{ work }}
        </li>
      </ul>

      <h3>Impact</h3>

      <ul>
        <li
          v-for="item in selectedProject.impact"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>

      <h3>Technologies Used</h3>

      <div class="tech">
        <span
          v-for="tech in selectedProject.tech"
          :key="tech"
        >
          {{ tech }}
        </span>
      </div>

    </div>

  </section>
</template>

<script setup>

import { ref } from "vue"

const selectedCompany = ref(null)
const selectedProject = ref(null)

const selectCompany = (company) => {
  selectedCompany.value = company
  selectedProject.value = null
}

const selectProject = (project) => {
  selectedProject.value = project
}

const companies = [

  {
    name: "Accenture",

    role: "Full stack LLM Development Analyst",

    projects: [

      {
        name: "IPU Optimization",

        role: "Data Engineer",

        work: [
          "Migrated Informatica workflows to AWS",
          "Built cloud architecture using S3, Lambda, Step Functions, SQS, SNS and DynamoDB",
          "Optimized cloud operations"
        ],

        impact: [
          "Reduced infrastructure cost"
        ],

        tech: [
          "S3",
          "Lambda",
          "Step Functions",
          "SQS",
          "SNS",
          "DynamoDB"
        ]
      },

      {
        name: "Project Alexandria",

        role: "Data Warehouse Engineer",

        work: [
          "Designed scalable cloud architecture",
          "Built reusable AWS components",
          "Developed self-service portal using Next.js"
        ],

        impact: [
          "Improved reliability and scalability",
          "Reduced development time ",
          "Increased user engagement"
        ],

        tech: [
          "S3",
          "Lambda",
          "SQS",
          "SNS",
          "SES",
          "DynamoDB Streams",
          "Next.js"
        ]
      },

      {
        name: "CDA DAP Migration",

        role: "Data Engineer",

        work: [
          "Migrated 5+ legacy systems",
          "Built AWS Glue ETL pipelines",
          "Migrated Databricks notebooks",
          "Converted 20+ Fivetran models into SQL-based transformations"
        ],

        impact: [
          "Reduced manual effort",
          "Improved pipeline reliability",
          "Reduced execution time ",
          "Reduced maintenance effort"
        ],

        tech: [
          "AWS Glue",
          "S3",
          "Lambda",
          "Step Functions",
          "SQS",
          "Databricks",
          "Fivetran"
        ]
      }

    ]

  },

  {
    name: "Talentztech Solution",

    role: "Senior Software Engineer",

    projects: [

      {
        name: "Welcome CRM",

        role: "Senior Software Engineer",

        work: [
          "Configured frontend based on client requirements",
          "Built dynamic API tables",
          "Integrated backend APIs"
        ],

        impact: [
          "Improved user experience and engagement",
          "Achieved 100% data accuracy",
          "Increased project clarity"
        ],

        tech: [
          "Vue 3",
          "REST API"
        ]
      }

    ]

  },

  {
    name: "EC Group Datasoft",

    role: "Software Engineer/Software Engineer Trainee",

    projects: [

      {
        name: "Strategy AI",

        role: "Software Engineer",

        work: [
          "Developed backend APIs using Django REST Framework",
          "Built Vue.js frontend components",
          "Worked with enterprise AI workflows"
        ],

        impact: [
          "Improved data retrieval efficiency by 30%",
          "Built scalable enterprise modules"
        ],

        tech: [
          "Python",
          "Django",
          "Vue.js",
          "PostgreSQL"
        ]
      },

      {
        name: "Pinnit",

        role: "Software Engineer",

        work: [
          "Developed backend services",
          "Built frontend features using Vue.js",
          "Collaborated with UX/UI team"
        ],

        impact: [
          "Enhanced user interaction by 25%",
          "Improved application maintainability"
        ],

        tech: [
          "Python",
          "Vue.js",
          "REST API"
        ]
      },

      {
        name: "Strategy Cascader",

        role: "Software Engineer",

        work: [
          "Built scalable backend APIs",
          "Integrated frontend with backend services",
          "Implemented business workflows"
        ],

        impact: [
          "Improved overall application performance",
          "Supported enterprise-scale deployments"
        ],

        tech: [
          "Django",
          "Vue.js",
          "MySQL"
        ]
      },

      {
        name: "Waypoint",

        role: "Software Engineer trainee",

        work: [
          "Worked on .NET application features",
          "Collaborated with cross-functional teams"
        ],

        impact: [
          "Delivered customer-requested enhancements"
        ],

        tech: [
          ".NET",
          "Vue.js",
          "SQL Server"
        ]
      },

      {
        name: "Campus",

        role: "Software Engineer trainee",

        work: [
          "Developed modules for campus management",
          "Implemented backend functionality"
        ],

        impact: [
          "Improved operational workflows"
        ],

        tech: [
          ".NET",
          "Vue.js",
          "SQL Server"
        ]
      }

    ]

  }

]

</script>

<style scoped>

section{
  padding:80px 10%;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
  margin-top:20px;
}

.card{
  background:#1e293b;
  padding:20px;
  border-radius:15px;
  cursor:pointer;
  transition:0.3s;
  border:2px solid transparent;
  color:white;
}

.card:hover{
  transform:translateY(-5px);
}

.active{
  background:#2563eb;
  border:2px solid #60a5fa;
  box-shadow:0 0 20px rgba(96,165,250,.4);
}

.details{
  margin-top:40px;
  background:#111827;
  padding:30px;
  border-radius:20px;
  color:white;
}

.details h3{
  margin-top:20px;
}

ul{
  margin-left:20px;
  margin-top:10px;
}

li{
  margin:8px 0;
}

.tech{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:15px;
}

.tech span{
  background:#2563eb;
  padding:8px 15px;
  border-radius:20px;
  font-size:14px;
}

</style>