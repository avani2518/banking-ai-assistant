# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/64d91104-5a45-47c3-87b5-3c1fe5a82140

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/64d91104-5a45-47c3-87b5-3c1fe5a82140) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Development with a local mock backend
-----------------------------------

This project includes a minimal mock backend (Express) you can run locally for development. It exposes /query and /health endpoints compatible with the frontend.

1. Install dependencies (if you haven't already):

```powershell
npm i
```

2. Run the mock server in a separate terminal:

```powershell
npm run mock:server
```

3. Optionally set the API base URL in `.env` or `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the frontend:

```powershell
npm run dev
```

Now open the app (Vite default) and it will use the mock backend via proxy (`/query`) or via the explicit VITE_API_BASE_URL.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/64d91104-5a45-47c3-87b5-3c1fe5a82140) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
