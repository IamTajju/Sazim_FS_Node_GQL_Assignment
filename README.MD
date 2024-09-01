# GoodWords Blogging Platform Documentation

## Demo Link
https://drive.google.com/file/d/1Ou8IWNAzwojdwRgYTykEnPCTtyQUzkaN/view?usp=sharing

## Introduction
GoodWords is a blogging platform with a modern technology stack. This documentation provides an overview of the system, focusing on the implementation of key features including user registration, post management, version control, and activity logging.

## Technology Stack

### Server
* ExpressJS + Apollo Server: Used to build the GraphQL server.
* Prisma: ORM for PostgreSQL.
### Client
* ReactJS + Apollo Client: Frontend framework and GraphQL client.
* Material UI: For UI components.
* Vite: For faster development and build process.

## Project Structure
```
├── client
│   ├── README.md
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-6ZBxokAm.js
│   │   │   └── index-DZriRxxp.css
│   │   ├── index.html
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── apolloClient.js
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── loginForm.jsx
│   │   │   │   ├── protectedRoute.jsx
│   │   │   │   ├── redirectLink.jsx
│   │   │   │   └── registrationForm.jsx
│   │   │   ├── common
│   │   │   │   ├── form.jsx
│   │   │   │   ├── multiStepForm.jsx
│   │   │   │   └── navbar.jsx
│   │   │   └── posts
│   │   │       ├── commentCard.jsx
│   │   │       ├── postCard.jsx
│   │   │       └── postMutationModal.jsx
│   │   ├── context
│   │   │   ├── authContext.jsx
│   │   │   └── categoriesContext.jsx
│   │   ├── graphql
│   │   │   ├── mutations.js
│   │   │   ├── queries.js
│   │   │   └── subscriptions.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── activityLogPage.jsx
│   │   │   ├── homePage.jsx
│   │   │   ├── loginPage.jsx
│   │   │   ├── postPage.jsx
│   │   │   └── registrationPage.jsx
│   │   └── utils
│   └── vite.config.js
└── server
    ├── app.js
    ├── config
    │   └── environment
    │       └── index.js
    ├── eslint.config.js
    ├── graphql
    │   ├── context.js
    │   ├── index.js
    │   ├── resolvers
    │   │   ├── activityLog
    │   │   │   ├── index.js
    │   │   │   └── queries.js
    │   │   ├── category
    │   │   │   ├── index.js
    │   │   │   └── queries.js
    │   │   ├── comment
    │   │   │   ├── index.js
    │   │   │   ├── mutations.js
    │   │   │   └── queries.js
    │   │   ├── index.js
    │   │   ├── post
    │   │   │   ├── index.js
    │   │   │   ├── mutations.js
    │   │   │   ├── queries.js
    │   │   │   └── subscriptions.js
    │   │   ├── user
    │   │   │   ├── index.js
    │   │   │   ├── mutations.js
    │   │   │   └── queries.js
    │   │   └── utils.js
    │   ├── schema.js
    │   └── typedefs
    │       ├── activityLogSchema.graphql
    │       ├── categorySchema.graphql
    │       ├── commentSchema.graphql
    │       ├── index.graphql
    │       ├── postSchema.graphql
    │       └── userSchema.graphql
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   ├── db.js
    │   ├── migrations
    │   │   └── migration_lock.toml
    │   ├── schema.prisma
    │   └── seed.js
    └── services
        └── activityService.js
```

## Setup Instructions
`NOTE:` Repeat these steps <b>separately</b> for <b>server</b> and <b>client</b> folders, PLEASE set up appropriate env variable before starting the app.

### 1. Environment Variables:
* Use .env.example to identify required environment variables. Create a .env file with necessary configurations.

### 2. Dependencies:
Initialize package.json for client and server directories separately.
```
npm init
```
```
npm install
```
### 3. Database Setup:
* Run prisma migrate dev to apply migrations.
* Seed the database using prisma seed.

### 4. Running the Project
Server: Navigate to the server directory and run npm install followed by npm run dev.
Client: Navigate to the client directory and run npm install followed by npm run dev.
`Ensure the correct Graphql http link and ws link (the server uri) are set in client/.env `

## Implementation

### 1. User Registration and Login
1. User Registration and Login
* Authentication: Implemented JWT authentication with middleware in ExpressJS. Authenticated routes in React use an authorization header to secure access.

* Multi-Step Form:
    * Components: Utilizes reusable *custom* `FormWizard` components for form generation along with react-hook-form manages form state, validation, and submission, 
    * Navigation: Users can navigate between steps and validate fields dynamically.
    * By providing field type values, the component maps to the relevant Material UI Component.

    * <b>Usage Example</b>:
    ```
        const initialValues = {
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        gender: null,
        email: '',
        password: '',
        confirmPassword: '',
    };

        // Define the steps for the form wizard
    const steps = [
        {
            id: 'Name',
            fields: [
                { name: 'firstName', type: 'text', required: true },
                { name: 'lastName', type: 'text' },
            ],
        },
        {
            id: 'Particulars',
            fields: [
                { name: 'dateOfBirth', type: 'date' },
                {
                    name: 'gender',
                    type: 'select',
                    options: [
                        { value: '', label: 'Select Gender' }, // Default option
                        { value: 'MALE', label: 'Male' },
                        { value: 'FEMALE', label: 'Female' },
                        { value: 'UNSPECIFIED', label: 'UNSPECIFIED' },
                    ],
                },
            ],
        },
        {
            id: 'Credentials',
            fields: [
                { name: 'email', type: 'email' },
                { name: 'password', type: 'password' },
                { name: 'confirmPassword', type: 'confirmPassword' },
            ],
        },
    ];

        const handleSubmit = (values) => {
        registerUser({ variables: { registerInput: values } });
    };

    // FormWizard uses Resuable Custom Form Components which can be used on their own.
            <FormWizard
                steps={steps}
                defaultValues={initialValues}
                onSubmit={handleSubmit}
                isLoading={loading}
            />
    ```

### 2. Post CRUD Management
* GraphQL and Prisma:
    * CRUD Operations: Implemented using GraphQL mutations and Prisma ORM.
    * Database: Prisma client is initialized in db.js <b>(Singleton)</b> to manage database interactions.

### 3. Post Version Control & Real-Time Changes
```
model Post {
  id Int @id @default(autoincrement())
  author User @relation(fields: [authorId], references: [id])
  authorId Int
  versions PostHistory[] @relation("postVersions")
  currentVersion PostHistory? @relation("currentVersion", fields: [currentVersionId], references: [id])
  currentVersionId Int? @unique
  categories Category[]
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
  comments Comment[]
  likes User[] @relation("Likes")
  associatedActivity ActivityLog[]
  @@index([authorId])
}

model PostHistory {
  id Int @id @default(autoincrement())
  post Post @relation("postVersions", fields: [postId], references: [id])
  postId Int
  postAsCurrent Post? @relation("currentVersion")
  content String
  createdAt DateTime @default(now())
}

```

* Tracking Changes: New versions are created in PostHistory each time a post is updated. The currentVersion field in the Post model points to the latest version.

* Reverting Versions: To revert to a previous version, the currentVersion field is updated to the desired PostHistory record. Real-time updates are handled via GraphQL subscriptions.

<b>Real-Time Updates:</b>
GraphQL Subscription:

* Subscription Setup: The postUpdated subscription is set up to notify clients in real-time when a post is updated or reverted.
* PubSub Integration: Uses graphql-subscriptions to handle real-time updates. The pubsub instance is used to publish events when posts are updated or reverted.

    ```
    import { PubSub } from 'graphql-subscriptions';

    const pubsub = new PubSub();
    const POST_UPDATED = 'POST_UPDATED';

    const postSubscriptions = {
    Subscription: {
        postUpdated: {
        subscribe: () => pubsub.asyncIterator([POST_UPDATED]),
        },
    },
    };

    export { pubsub, POST_UPDATED, postSubscriptions };

    ```
* Triggering Updates: pubsub.publish is called during mutations to update post content or revert versions. This ensures that all clients receive the latest post data in real-time.


### 4. Activity Log
#### Overview
The Activity Log feature records user interactions with posts, including creating posts, commenting, and liking posts. It allows users to view their activities and filter by type.

#### Data Models:

```
enum ActivityAction {
  POST
  LIKE
  COMMENT
}

model ActivityLog {
  id Int @id @default(autoincrement())
  actionType ActivityAction
  postId Int
  commentId Int? @unique()
  userId Int
  createdAt DateTime @default(now())
  user User @relation(fields: [userId], references: [id])
  post Post @relation(fields: [postId], references: [id])
  comment Comment? @relation(fields: [commentId], references: [id])
}

```
### Implementation
1. Service Layer:

    * `logActivity` Function: This function is called during GraphQL mutations to record user actions. It logs activities related to creating posts, commenting, and liking posts.

2. Mutation Integration:

    * Create Post: Logs an entry in the Activity Log when a new post is created.
    * Comment: Logs an entry when a user comments on a post.
    * Like: Logs an entry when a user likes a post.

3. Activity Log Display:

    * User Activity: Users can view a log of their activities, including posts they’ve created, liked, or commented on.
    * Filtering: Allows users to filter the activity log to show only likes, comments, or posts.
