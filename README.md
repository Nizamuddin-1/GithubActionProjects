# 🚀 Full-Stack MERN DevOps & GitHub Actions Mastery

A complete hands-on practice repository with 5 progressively challenging MERN applications deployed to AWS with GitHub Actions CI/CD.

---

## 📚 Project Index

| # | Project Name | Directory | Key GitHub Actions Concepts | AWS Target Architecture |
|---|---|---|---|---|
| 1 | **QuickFeedback** | [`project1-quickfeedback/`](./project1-quickfeedback) | Basic workflows, triggers (`push`/`pull_request`), unit tests | S3 Static Hosting + EC2 + PM2 |
| 2 | **TaskFlow** | [`project2-taskflow/`](./project2-taskflow) | Matrix builds (Node 18/20), dependency caching, artifacts, badge | Elastic Beanstalk + S3/CloudFront CDN invalidation |
| 3 | **NoteSprint** | [`project3-notesprint/`](./project3-notesprint) | GitHub Environments (`dev`/`prod`), Environment Secrets & Vars, Manual Approval Gate | AWS App Runner + S3/CloudFront |
| 4 | **SnapLink** | [`project4-snaplink/`](./project4-snaplink) | AWS OIDC authentication (zero long-lived keys), Docker Buildx, ECR push | Amazon ECS (Fargate serverless containers) |
| 5 | **SpendWise** | [`project5-spendwise/`](./project5-spendwise) | Reusable workflows (`workflow_call`), path filtering, healthcheck smoke tests & auto-rollback, Slack alerts | AWS Lambda (Function URL) + S3/CloudFront |

---

## 🏁 Recommended Practice Flow

1. Pick one project at a time (start with `project1-quickfeedback`).
2. Navigate into that folder:
   ```bash
   cd project1-quickfeedback
   ```
3. Initialize Git, create a repository on GitHub, and push your code.
4. Set up the required AWS infrastructure and GitHub Secrets following the project's README.
5. Watch the GitHub Actions tab run your pipeline!

