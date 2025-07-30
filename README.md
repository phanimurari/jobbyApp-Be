# Blogs App API

This document provides instructions and examples for using the Blogs App API.

## Base URL

`http://localhost:8005`

---

## Authentication Routes

### Register a New User

Registers a new user in the system.

-   **URL:** `/api/auth/register`
-   **Method:** `POST`
-   **Body:**

    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123",
      "role": "user"
    }
    ```

-   **cURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }' http://localhost:8005/api/auth/register
    ```

### Login User

Authenticates a user and returns a JWT token.

-   **URL:** `/api/auth/login`
-   **Method:** `POST`
-   **Body:**

    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

-   **cURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "email": "test@example.com",
      "password": "password123"
    }' http://localhost:8005/api/auth/login
    ```

### Get Current User

Retrieves the profile of the currently authenticated user.

-   **URL:** `/api/auth/me`
-   **Method:** `GET`
-   **Headers:**
    -   `Authorization: Bearer <YOUR_JWT_TOKEN>`

-   **cURL Example:**

    ```bash
    curl -X GET -H "Authorization: Bearer <YOUR_JWT_TOKEN>" http://localhost:8005/api/auth/me
    ```

### Get User Profile

Retrieves the profile details of the authenticated user.

-   **URL:** `/api/auth/profile`
-   **Method:** `GET`
-   **Headers:**
    -   `Authorization: Bearer <YOUR_JWT_TOKEN>`

-   **cURL Example:**

    ```bash
    curl -X GET -H "Authorization: Bearer <YOUR_JWT_TOKEN>" http://localhost:8005/api/auth/profile
    ```

---

## Blog Routes

### Get All Blogs

Retrieves a list of all blog posts.

-   **URL:** `/api/blogs`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `title` (string, optional): Filter blogs by title (case-insensitive).
    -   `category` (string, optional): Filter blogs by category.
    -   `sortby` (string, optional): Sort blogs. Can be `latest` or `oldest`.
-   **cURL Examples:**

    -   **Get all blogs:**
        ```bash
        curl -X GET http://localhost:8005/api/blogs
        ```
    -   **Filter by title:**
        ```bash
        curl -X GET http://localhost:8005/api/blogs?title=MERN
        ```
    -   **Filter by category:**
        ```bash
        curl -X GET "http://localhost:8005/api/blogs?category=Technology"
        ```
    -   **Sort by latest:**
        ```bash
        curl -X GET http://localhost:8005/api/blogs?sortby=latest
        ```
    -   **Sort by oldest:**
        ```bash
        curl -X GET http://localhost:8005/api/blogs?sortby=oldest
        ```
    -   **Combined query:**
        ```bash
        curl -X GET "http://localhost:8005/api/blogs?category=Technology&sortby=latest"
        ```

- **Sample Response:**
    ```json
    {
        "success": true,
        "posts": [
            {
                "_id": "67e4e2e8b612d88403af3a0f",
                "userId": {
                    "_id": "67e3d5005dbe7256d62a5627",
                    "username": "testuser"
                },
                "content": "<p>The MERN stack...</p>",
                "title": "Crafting a MERN Stack Application with Tailwind CSS and TypeScript – A Step-by-Step Guide",
                "image": "https://firebasestorage.googleapis.com/v0/b/mern-blog-b327f.appspot.com/o/1743057963123-photo_2025-03-27%2013.40.00-min.jpeg?alt=media&token=fc4e3665-9516-4b53-9126-58dc0208f468",
                "category": "reactjs",
                "slug": "crafting-a-mern-stack-application-with-tailwind-css-and-typescript--a-step-by-step-guide",
                "createdAt": "2025-03-27T05:32:24.839Z",
                "updatedAt": "2025-03-27T08:54:41.990Z",
                "__v": 0
            }
        ],
        "totalPosts": 1
    }
    ```

### Get a Single Blog

Retrieves a single blog post by its ID.

-   **URL:** `/api/blogs/:id`
-   **Method:** `GET`
-   **cURL Example:**

    ```bash
    curl -X GET http://localhost:8005/api/blogs/67e4e2e8b612d88403af3a0f
    ```

### Create a New Blog

Creates a new blog post. Requires authentication.

-   **URL:** `/api/blogs`
-   **Method:** `POST`
-   **Headers:**
    -   `Authorization: Bearer <YOUR_JWT_TOKEN>`
    -   `Content-Type: application/json`
-   **Body:**

    ```json
    {
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post.",
      "image": "https://example.com/image.png",
      "category": "Technology",
      "slug": "my-first-blog-post"
    }
    ```

-   **cURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -d '{
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post.",
      "image": "https://example.com/image.png",
      "category": "Technology",
      "slug": "my-first-blog-post"
    }' http://localhost:8005/api/blogs
