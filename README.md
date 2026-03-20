# Next.js Starter Template 🚀

A production-ready starter template with everything you need to ship fast.

## Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Database & Auth | [Supabase](https://supabase.com/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Hosting | [Vercel](https://vercel.com/) |
| Code Quality | ESLint + Prettier |

---

## Getting Started

### 1. Fork or clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/nextjs-template.git my-app
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then fill in your values in `.env.local`:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API (keep secret!) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for local dev |

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL below in the Supabase SQL Editor to create a `profiles` table:

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,
  avatar_url text
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

3. In Supabase, go to **Authentication → URL Configuration** and add:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/api/auth/callback`

### 5. Generate TypeScript types from Supabase (optional but recommended)

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── register/      # Register page
│   ├── api/
│   │   ├── auth/callback/ # Supabase email confirmation handler
│   │   └── health/        # Health check endpoint
│   ├── dashboard/         # Protected dashboard page
│   ├── globals.css        # Global styles + CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (navbar, sidebar, etc.)
│   └── shared/            # Shared components used across pages
├── hooks/                 # Custom React hooks
│   ├── useUser.ts         # Auth state hook
│   └── useToast.ts        # Toast notification hook
├── lib/
│   ├── supabase/
│   │   ├── client.ts      # Browser Supabase client
│   │   ├── server.ts      # Server Supabase client
│   │   └── middleware.ts  # Middleware session handling
│   └── utils.ts           # cn() utility and helpers
├── store/                 # Zustand stores
│   ├── auth.store.ts      # Auth state (user, loading)
│   └── app.store.ts       # App UI state (sidebar, theme)
├── types/                 # TypeScript types
│   ├── database.types.ts  # Supabase generated types
│   └── index.ts           # Shared types
└── middleware.ts           # Next.js middleware (route protection)
```

---

## Deploying to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables from `.env.local` to Vercel's environment variables
4. Update `NEXT_PUBLIC_APP_URL` to your production URL
5. In Supabase, add your production URL to the allowed redirect URLs
6. Deploy!

---

## Adding More shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
# Examples:
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
npx shadcn@latest add table
```

---

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run typecheck    # Check TypeScript types
```

---

## Adding a New Zustand Store

Create a new file in `src/store/`:

```ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "my-store" }
  )
);
```

---

## License

MIT
