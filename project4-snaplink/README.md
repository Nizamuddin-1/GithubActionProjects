# Project 4: SnapLink (URL Shortener & Analytics)

A MERN stack project demonstrating AWS OIDC (no long-lived credentials), Multi-Stage Docker builds, Amazon ECR, and Amazon ECS (Fargate).

---

## 🛠 Local Setup

### Backend (Docker or Node)
```bash
cd backend
npm install
npm test
npm start
# Or with Docker:
docker build -t snaplink-backend .
docker run -p 5000:5000 snaplink-backend
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
Requires only OIDC-based IAM Role (zero secret keys!):
- `AWS_ROLE_ARN`
- `AWS_REGION`
- `ECR_REPOSITORY`
- `ECS_CLUSTER`
- `ECS_SERVICE`

