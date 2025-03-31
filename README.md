# blog-sphere

A web application that allows users to create, read, update, and delete blog posts. It features a responsive design, user authentication, and a rich text editor for creating and editing posts.

## Technologies Used

- Node.js [22](https://nodejs.org/en/)
- Express.js
- MongoDB
- React
- Vite
- Tailwind CSS
- Clerk for authentication
- Quill for rich text editing
- ImageKit for image handling

## Run Locally

### server

Install dependencies:

```bash
cd server
npm install
```

### Environment Variables

```bash
PORT=5000
ORIGIN= http://localhost:3000
DB_URI=

CLERK_WEBHOOK_SECRET=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

## image kit

IK_URL_ENDPOINT = your_image_kit_url_endpoint
IK_PUBLIC_KEY = your_image_kit_public_key
IK_PRIVATE_KEY = your_image_kit_private_key
```

Start the development server:

```bash
node --run start
```

### client

Install dependencies:

```bash
cd client
npm install
```

### Environment Variables

```bash
VITE_IK_URL = your_image_kit_url_endpoint
VITE_IK_PUBLIC = your_image_kit_public_key
VITE_CLERK_PUBLISHABLE_KEY= your_clerk_publishable_key
VITE_API_URL= http://localhost:5000
```

Start the development server:

```bash
node --run dev
```
