# Project 5: SpendWise (Serverless MERN & Enterprise CI/CD)

A full-stack serverless MERN app demonstrating Reusable Workflows (`workflow_call`), Path Filtering, Automated Smoke Tests with Instant Rollback, and Slack Webhook Alerts deployed to AWS Lambda (Function URL) + S3 + CloudFront.

---

## 🛠 Local Setup

### Backend (Local Express runner)
```bash
cd backend
npm install
npm test
```

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run build
```

---

## 🚀 GitHub Setup
- `AWS_ROLE_ARN` (OIDC IAM Role)
- `AWS_REGION`
- `LAMBDA_FUNCTION_NAME`
- `LAMBDA_FUNCTION_URL`
- `S3_BACKUP_BUCKET`
- `S3_FRONTEND_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `SLACK_WEBHOOK_URL` (optional)

