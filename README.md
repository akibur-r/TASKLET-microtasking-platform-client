<p align="center" id="home">
    <a href="https://tasklet-by-akib.web.app/" target="_blank">
        <img width="50%" src="https://i.postimg.cc/7LfxLvww/image.png" alt="Tasklet logo">
    </a>
    <br/>
</p>

<br/>
<details open="open">
<summary><h3>Table of Content</h3></summary>

- [Home](#home)
- [Tech Stack](#tech-stack)
- [Project Details](#project-details)
- [Key Features](#key-features)
- [How to Run This Project](#how-to)

</details>

<br/>
<div align="center" id="tech-stack">
    <div>Frontend Made With</div>
    <br/>
    <p>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/DaisyUI-5A0FC8?style=for-the-badge&logo=daisyui&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Lottie%20React-1D1D1D?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/AOS-29ABE2?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/date--fns-262626?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/React%20Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/React%20Helmet-282C34?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/React%20Toastify-FF6C37?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Tooltip-121212?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/SweetAlert2-FF6C37?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white" />
</p>

</div>

<div align="center">
    <div>Backend Built With</div>
    <br/>
   <p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/CORS-4B8BBE?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Dotenv-88C46C?style=for-the-badge&logo=nodedotjs&logoColor=white" />
</p>

</div>

<br/>

**Tasklet** is a mobile-responsive, full-stack web application that connects buyers and workers through micro-task opportunities. Users can register as buyers to create paid tasks or as workers to complete tasks and earn virtual coins. The platform features role-based dashboards, secure authentication, task management, submission review, coin transactions, and withdrawal systems—streamlining micro-earning in a structured and user-friendly environment.

<h2 id="project-details">📘Project Details</h2>

### Project Name: Tasklet

### Live Link: [https://tasklet-by-akib.web.app/](https://tasklet-by-akib.web.app/)
```
Admin email: admin@tasklet.web.app
Admin password: MadeByAkib143
```

<h2 id="key-features">✨Key Features</h2>

- Role-based dashboards for Admin, Buyer, and Worker.
- Buyers can create, update, and delete micro-tasks.
- Workers can browse tasks and submit proof of completion.
- Submissions go through a review and approval process.
- Virtual coin system for earning and spending.
- Stripe integration for purchasing coins securely.
- Workers can withdraw coins for real money.
- Admin can manage users, roles, tasks, and withdrawals.
- Responsive design for mobile, tablet, and desktop.
- Notifications for submissions, approvals, and payments.
- Firebase authentication with Google and email/password.
- Protected routes with role-based access control.

<h2 id="how-to">How to Run This Project</h2>

1. Open your command line and run this command:

```javascript
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-akibur-r.git
```

2. After cloning the files, run:

```javascript
cd b11a12-client-side-akibur-r.git
```

3.1 To run the frontend server:

```javascript
cd /client
npm install
npm run dev
```

> Note: You'll need to provide firebase auth credentials in a .env.local file in /client directory.

3.2 To run the backend server:

```javascript
cd /server
npm install
npm run dev
```

> Note: You'll need to provide mongodb compass credentials in a .env file in /server directory.
