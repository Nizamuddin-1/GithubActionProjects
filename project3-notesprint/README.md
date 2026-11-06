# Project 3: NoteSprint (Markdown Notes App)

A MERN stack project demonstrating Multi-Environment Promotion (`development` vs `production`), Environment Protection Rules (Manual Approval Gates), and deployment to AWS App Runner.

---

## 🛠 Local Setup

### Backend
```bash
cd backend
npm install
npm test
npm start
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
1. Configure Environments: `development` and `production` under **Settings > Environments**.
2. Add Required Reviewers on `production`.
3. Set Environment Variables:
   - `API_URL`
   - `FRONTEND_URL`
4. Set Environment Secrets:
   - `S3_BUCKET`
   - `APPRUNNER_SERVICE_ARN`
5. Set Repository Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

