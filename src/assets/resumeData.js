import { reactive } from "vue";

export default {
// This file contains the resume data for Sakkthinagaraj A P.It is the brain of the chatbot, providing all the information about his skills, experience, education, and projects. The chatbot will use this data to answer questions.//use backtick(`) for multiline string,  // use double quotes("") for single line string
  overview: `
Sakkthinagaraj A P is a Full Stack Developer and Cloud Data Engineer with experience in building scalable web applications and cloud-based data processing systems.

On the full stack side, he has worked with Python (Django REST Framework) for backend development and modern frontend frameworks such as Vue.js, React.js, and Next.js. He has built REST APIs, developed modular frontend-backend architectures, and contributed to enterprise-grade application development.

In addition, he has good experience in cloud data engineering on AWS, where he has worked with services such as AWS Glue, S3, Lambda, SQS, and Step Functions. He has designed and implemented cloud-based data workflows, including automated file processing pipelines, orchestration of distributed tasks, and event-driven architectures for scalable data movement and transformation.

He has also contributed to enterprise systems where application development and cloud data pipelines were integrated, ensuring smooth data flow across services and environments.

Overall, his expertise spans full stack development and AWS cloud data engineering, with a strong focus on building scalable, cloud-native applications and automated data workflows.
`,

  about:
    "Sakkthinagaraj A P is a Full Stack Software Engineer and AWS Data Engineer with 5+ years of experience building scalable backend systems, cloud-native applications, and modern front-end interfaces. His expertise includes Python, Django, FastAPI, Vue.js, React.js, Next.js, AWS Glue, Lambda, Step Functions, ETL pipelines and Microservices.",

  skills:
    "Python, Django, FastAPI, Flask, Vue 2, Vue 3, React, Next.js, AWS, Docker, PostgreSQL, MySQL, Redis, JWT, OAuth2, Terraform, GitHub Actions.",

  aws:
    "Sakkthinagaraj have worked extensively with AWS S3, Lambda, Step Functions, SQS, SNS, SES, DynamoDB, DynamoDB Streams, AWS Glue, Athena, Redshift, CloudWatch, CloudFront and AppFlow.",

  education:
    "Sakkthinagaraj completed MCA from SASTRA University and BCA from Government Arts College.",

    companyList: 
    "Over 5 years of experience by working in  Accenture, EC Group Datasoft and Talentztech Solution." ,
  companies: {

    accenture:
      "Currently working at Accenture as Fullstack LLM  Development Analyst.Worked on IPU Optimization, Project Alexandria and CDA DAP Migration projects.",

    ecgroup:
      "Worked at EC Group Datasoft as Software Engineer from Sept 2020 to Mar 2024.Worked on multiple projects including Strategy AI, Pinnit, Strategy Cascader and StrategyAI.",

    talentztech:
      "Worked as Senior Software Engineer at Talentztech Solution.Worked on Welcome CRM project."
  },

  projects: {

    ipu:
      "IPU Optimization involved migrating Informatica workflows to AWS. Sakkthinagaraj built cloud architecture using S3, Lambda, Step Functions, SQS, SNS and DynamoDB, reducing infrastructure cost by 50%.",

    alexandria:
      "Project Alexandria involved building reusable AWS components and a Next.js self-service portal, improving reliability by 40% and reducing development time by 35%.",

    cda:
      "CDA DAP Migration involved migrating 5+ legacy environments to AWS, building AWS Glue ETL pipelines and converting 20+ Fivetran transformation models into SQL implementations.",

    strategyai:
      "Strategy AI was an enterprise application where Sakkthinagaraj developed backend APIs using Django REST Framework and frontend components using Vue.js.",

    pinnit:
      "Pinnit involved backend services development and Vue.js frontend implementation.",

    cascader:
      "Strategy Cascader involved scalable backend APIs and business workflow implementation.",

    crm:
      "Welcome CRM involved configuring frontend requirements and integrating backend APIs."
  },
  awsExperience: {
    glue:
      "Sakkthinagaraj has extensive experience with AWS Glue, including building ETL pipelines, data cataloging, and automating data workflows.",
      lambda:
      "Sakkthinagaraj has implemented serverless functions using AWS Lambda for event-driven architectures and automated data processing tasks.",
      stepFunctions:
      "Sakkthinagaraj has designed and orchestrated complex workflows using AWS Step Functions, enabling scalable and reliable data processing pipelines.",
      s3:
      "Sakkthinagaraj has worked with Amazon S3 for data storage, implementing bucket policies, versioning, and lifecycle management for cost-effective data retention.",
      SQS:
      "Sakkthinagaraj has utilized AWS SQS for message queuing, enabling decoupled and scalable communication between distributed services.",
      SNS:
      "Sakkthinagaraj has implemented AWS SNS for pub/sub messaging, enabling real-time notifications and event-driven architectures.",  
      SES:
      "Sakkthinagaraj has configured and managed email sending through AWS SES, implementing email templates and handling deliverability best practices.",
      APIGateway:
      "Sakkthinagaraj has designed and deployed RESTful APIs using AWS API Gateway, enabling secure and scalable access to backend services.",
      DynamoDB:
      "Sakkthinagaraj has worked with Amazon DynamoDB for NoSQL data storage, implementing efficient data models, indexing strategies, and DynamoDB Streams for real-time data processing.",
  },
  djangoExperience: {
    restFramework:
      "Sakkthinagaraj has developed RESTful APIs using Django REST Framework, implementing authentication, serialization, and viewsets for efficient backend services.",  
      modularArchitecture:
      "Sakkthinagaraj has designed modular backend-frontend architectures using Django, ensuring clean separation of concerns and maintainable codebase."
  },
  FrontendExperience: {
    vuejs:
      "Sakkthinagaraj has developed dynamic frontend interfaces using Vue.js, implementing components, state management, and routing for responsive web applications.",
      reactjs:
      "Sakkthinagaraj has built interactive user interfaces using React.js, leveraging hooks, context API, and component-based architecture for scalable frontend development.",
      nextjs:
      "Sakkthinagaraj has implemented server-side rendering and static site generation using Next.js, optimizing performance and SEO for web applications."
  },
  FastAPIExperience: {
    fastapi:
      "Sakkthinagaraj has developed high-performance APIs using FastAPI, implementing asynchronous endpoints, dependency injection, and data validation for efficient backend services.Also,developed fastAPI service to complement the behaviour of API Gateway and Lambda functions locally, enabling seamless integration with AWS services and ensuring local development was smooth and consistent."
  },
  IACExperience: {
    terraform:
      "Sakkthinagaraj has implemented infrastructure as code using Terraform, enabling automated provisioning and management of cloud resources for scalable and reproducible deployments.",
  },
  AIToolsExperience: {
    AmazonQ:
      "Sakkthinagaraj has utilized AmazonQ for generating code snippets, documentation, and assisting in problem-solving during development tasks.",
    Copilot:
      "Sakkthinagaraj has leveraged GitHub Copilot for code suggestions, autocompletion, and enhancing productivity during software development.",
  }
}