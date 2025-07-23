API 1: https://apis.ccbp.in/jobs

Example: https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=
Method: GET
Description: Returns a response containing the list of all jobs

Sample Response

```json
{
  "jobs": [
    {
      "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      "employment_type": "Full Time",
      "id": "d6019453-f864-4a2f-8230-6a9642a59466",
      "job_description": "We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.",
      "location": "Bangalore",
      "package_per_annum": "21 LPA",
      "rating": 4,
      "title": "Backend Engineer"
    }
    ...
  ],
  "total":25,
}
```

**CURL Example:**

```bash
curl -X GET "https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=" -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

API 2: https://apis.ccbp.in/jobs/:id

Example: https://apis.ccbp.in/jobs bb95e51b-b1b2-4d97-bee4-1d5ec2b96751

Method: GET

Description: Returns a response containing the job details

Sample Response
```json
{
  "job_details": {
    "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
    "company_website_url": "https://about.netflix.com/en",
    "employment_type": "Internship",
    "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
    "job_description": "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev",
    "skills": [
      {
        "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png",
        "name": "Docker"
      },
      ...
    ],
    "life_at_company": {
      "description": "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
      "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png"
    },
    "location":"Delhi",
    "package_per_annum":"10 LPA",
    "rating":4
  },
  "similar_jobs": [
    {
      "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
      "employment_type": "Freelance",
      "id": "2b40029d-e5a5-48cc-84a6-b6e12d25625d",
      "job_description": "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
      "location": "Delhi",
      "rating": 4,
      "title": "Frontend Engineer"
    },
    ...
  ]
}
```

**CURL Example:**

```bash
curl -X GET "https://apis.ccbp.in/jobs/bb95e51b-b1b2-4d97-bee4-1d5ec2b96751" -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**API 3: https://apis.ccbp.in/jobs**

Method: POST

Description: Creates a new job

**CURL Example:**

```bash
curl -X POST "https://apis.ccbp.in/jobs" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
  "employment_type": "Full Time",
  "job_description": "We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.",
  "location": "Bangalore",
  "package_per_annum": "21 LPA",
  "rating": 4,
  "title": "Backend Engineer"
}'

## Authentication Routes

### Register

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}' http://localhost:8005/api/auth/register

**Note:** This route requires admin authentication.
```

### Login

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "test@example.com",
  "password": "password123"
}' http://localhost:8005/api/auth/login
```

### Get Current User

```bash
curl -X GET -H "Authorization: Bearer <token>" http://localhost:8005/api/auth/me
```

## Job Routes

### Get All Jobs

```bash
curl -X GET -H "Authorization: Bearer <token>" http://localhost:8005/api/jobs
```

### Get a Single Job

```bash
curl -X GET -H "Authorization: Bearer <token>" http://localhost:8005/api/jobs/64bca149996c93156695499a
```

### Create a New Job

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{
  "company_logo_url": "https://example.com/logo.png",
  "employment_type": "Full-time",
  "job_description": "This is a description of the job.",
  "location": "New York",
  "package_per_annum": "120000",
  "rating": "4.5",
  "title": "Software Engineer"
}' http://localhost:8005/api/jobs
```