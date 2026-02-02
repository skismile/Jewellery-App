# Frontend Engineering Standards & Guide

This document outlines our architecture, folder structure, coding conventions, and best practices to ensure consistency and scalability across the team.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Global), [TanStack Query](https://tanstack.com/query/latest) (Server), URL Search Params
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Validation:** [Zod](https://zod.dev/)
- **Authentication:** [Clerk](https://clerk.com/)

---

## 📦 Package Management & Runtime

We use **[Bun](https://bun.sh/)** as our primary package manager and runtime.

### ⚡ Why Bun?
We migrated to Bun due to stability issues encountered with `npm` in **Next.js 15.5+** (specifically related to dependency resolution and build failures). Bun has proven to be faster and more reliable for our specific stack.

### 🔄 Compatibility
- **Primary:** usage of `bun install`, `bun run dev`, etc. is recommended.
- **Fallback:** You may use `npm` if you encounter specific Bun-related runtime bugs. The project is compatible with both lockfiles, though we primarily maintain `bun.lock`.

---

## 📂 Folder Structure

We use a **Module-based Architecture** to keep features encapsulated.

### High-Level Overview

```
src/
├── app/                 # Next.js App Router (Routes & Layouts)
│   ├── (auth)/          # Authentication routes (grouped)
│   ├── (root)/          # Main application routes
│   └── api/             # API Routes
├── modules/             # Feature-based modules (Core Logic)
│   ├── search/          # e.g., Search feature
│   ├── product/         # e.g., Product feature
│   └── user/            # e.g., User profile feature
├── components/          # Shared components
│   └── ui/              # Design System / Shadcn primitives
├── lib/                 # Shared utilities, configs, store factories
├── hooks/               # Global / Generic hooks
└── types/               # Global type definitions
```

### Module Structure (`src/modules/[feature]`)

Each feature should be self-contained in `src/modules`. This helps in scaling the app without polluting global namespaces.

```
src/modules/search/
├── components/          # Feature-specific "smart" components
├── ui/                  # Feature-specific "dumb"/presentational components
├── lib/                 # Feature-specific logic & helpers
├── hooks/               # Feature-specific hooks
├── stores/              # Feature-specific Zustand stores
├── types/               # Feature-specific types
├── config/              # Constants and configuration
├── services/            # API calls and external service wrapping
└── actions/             # Server Actions (if applicable)
```

### Application Routes (`src/app`)

- **`page.tsx`**: The entry point for a route. Should be relatively minimal, composing components from `modules`.
- **`layout.tsx`**: Define layout structures for sections of the app.
- **`(group)`**: Use route groups to organize routes without affecting the URL structure.

---

## 🔐 Environment Variables

We strict type-safety for environment variables using **Perfectionist** (`@t3-oss/env-nextjs`).
This ensures that the app fails locally and at build time if required keys are missing or invalid.

### 📄 The `env.ts` File
Defined in `src/lib/env.ts`, this file is the single source of truth for all environment variables.

### 🛡️ Why we use it?
1.  **Type Safety:** Provides full TypeScript autocomplete for `env.KEY`.
2.  **Runtime Validation:** Uses Zod to validate keys at runtime (e.g., verifying URLs or non-empty strings).
3.  **Strict Separation:** Clearly distinguishes between server-side (`process.env`) and client-side (`NEXT_PUBLIC_`) variables to prevent leaking secrets.

### 🚦 Maintenance Rules
- **NEVER** use `process.env.KEY` directly in application code. Always import `{ env } from "@/lib/env"`.
- **Always update `src/lib/env.ts`** when adding a new variable to `.env`.
- **Server vs Client:**
  - Secrets (API Keys, Database URLs) -> `server` object.
  - Public config (Analytics IDs, Public APIs) -> `client` object (Must start with `NEXT_PUBLIC_`).

---

## 🎨 Coding Style & Conventions

### Files & Naming
- **File Names:** Kebab-case (e.g., `product-card.tsx`, `use-auth.ts`).
- **Components:** PascalCase (e.g., `ProductCard`, `UserProfile`).
- **Variables/Functions:** CamelCase (e.g., `fetchUserData`, `isLoading`).
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`).

### Component Authoring
- **Functional Components:** Always use functional components.
- **Typed Props:** Always type your props with `interface` or `type`.
- **Styling:** Use Tailwind utility classes.
  - Use `cn()` utility for conditional class merging.
  - Avoid large explicit style objects unless dynamic.
- **Exports:** Use named exports or default exports consistently (Defaults for Pages/Layouts, Named for generic components is common, but follow file precedents).

**Example:**
```tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export function CustomButton({ label, isActive, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        "bg-neutral-100 hover:bg-neutral-200 text-neutral-900",
        isActive && "bg-blue-600 text-white hover:bg-blue-700"
      )}
    >
      {label}
    </button>
  );
}
```

---

## 🎨 Styling Strategy & Animations

### 💅 CSS & Tailwind: The "Tailwind First" Rule
We use **Tailwind CSS** for 99% of styling needs. It prevents stylesheet bloat and consistency rot.

- **Advanced Tailwind:**
  Even complex scenarios can be handled with arbitrary values, groups, and peers.
  *Example (Advanced):* A card that reveals specific content when a peer checkbox is checked, only on hover of a parent group.
  ```tsx
  <div className="group/card relative">
    <input type="checkbox" className="peer hidden" id="toggle" />
    <label
      htmlFor="toggle"
      className="opacity-0 group-hover/card:opacity-100 peer-checked:opacity-100 bg-[mask-image:linear-gradient(to_bottom,transparent,black)]"
    >
      Expand
    </label>
  </div>
  ```

- **When to use strict Custom CSS:**
  Only when Tailwind utilities (including arbitrary values `w-[123px]`) simply cannot express the logic.
  *Examples:* Complex multi-step `@keyframes` animations, scrollbar styling (if plugins fail), or third-party library overrides that require deep specificity ladders.

### 🎭 Animations (Framer Motion)
We use **Framer Motion** for complex, fluid layout animations.

- **Memory Safety:** ⚠️
  Animations can cause memory leaks if not handled correctly.
  - **Cleanup:** Ensure `AnimatePresence` children have unique keys.
  - **Event Listeners:** If using manual `useMotionValue` listeners, **always** return a cleanup function in `useEffect`.
  - **Heavy variants:** Avoid defining massive variant objects inside the render loop; move them outside the component.

---

## 🧩 Shared Components (UI)

- Located in `src/components/ui`.
- These are mostly **Shadcn UI** components.
- **Do not modify logic** inside these unless necessary; treat them as library code.
- Customize their look via `tailwind.config.ts` or passing generic classes.

---

## 💾 State Management Standards

We typically deal with 4 types of state:

1.  **URL State (Truth)**
    *   **Use when:** State should be shareable, bookmarkable, or persist on refresh (e.g., Search queries, filters, active tabs).
    *   **Tool:** `useSearchParams`, `useRouter` from `next/navigation`.
    *   *Note:* Often synchronized with local stores for UI responsiveness.

2.  **Server State**
    *   **Use when:** Fetching data from APIs.
    *   **Tool:** `@tanstack/react-query`.
    *   **Pattern:** Create custom hooks (e.g., `useProducts`) that wrap the query logic.

3.  **Global Client State**
    *   **Use when:** State needs to be accessed across many distant components and isn't URL-friendly (e.g., Sidebar open/closed, User preferences, Complex interaction session data).
    *   **Tool:** `zustand`.
    *   **Pattern:** Create stores in `src/modules/[feature]/stores`.

4.  **Local Component State**
    *   **Use when:** State is isolated to a single component (e.g., form input value before submit, toggle open/close).
    *   **Tool:** `useState`, `useReducer`.

---

## 📡 Query & Data Fetching

- **Library:** `@tanstack/react-query`.
- **Keys:** Use consistent Query Keys, ideally factories or constants to update cache invalidation easily.
- **Fetching:**
    - Prefer Server Actions for mutations.
    - Use Route Handlers (`src/app/api`) for complex data retrieval if needed, or call external APIs directly if safe.

---

## 🗄️ Database & ORM

If a feature requires direct database access (e.g., in API routes or Server Actions), we adhere to the following:

- **Preferred ORMs:** [Drizzle ORM](https://orm.drizzle.team/) or [Prisma](https://www.prisma.io/).
- **Usage:**
  - Use **Drizzle** for lightweight, SQL-like control and edge compatibility.
  - Use **Prisma** if you prefer a strong schema definition language (SDL) and extensive tooling.
- **Access Control:** Always ensure database queries are protected by authentication checks (e.g., via `Clerk`).

---

## ✅ Validation

- **Schema Validation:** Use **Zod**.
- **Forms:** Use **React Hook Form** combined with Zod resolvers (`@hookform/resolvers/zod`).
- **API Inputs:** Validate inputs on the server side using Zod schemas before processing.

**Example:**
```ts
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

export type User = z.infer<typeof UserSchema>;
```

---

## 💎 Code Quality & Best Practices

### 🧠 Memory Safety
JavaScript/React memory leaks are silent killers of performance.
- **Timers/Intervals:** Always clear them in the `useEffect` cleanup return.
- **Async Operations:** If a component unmounts while a fetch is pending, ignore the result (or use AbortController).
- **Detached DOM Elements:** Be careful with refs that hold onto large DOM trees after they are removed.

### 📖 Documentation (JSDoc)
Write **Inline JSDocs** for complex logic, hooks, or shared utilities. TS handles types, but JSDocs handle *intent*.

```ts
/**
 * Calculates the total price including tax and shipping.
 *
 * @param items - List of cart items
 * @param regionCode - ISO country code for tax calculation
 * @returns The final formatted price string (e.g. "$1,230.00")
 *
 * @example
 * const total = calculateTotal(items, 'US');
 */
export function calculateTotal(items: CartItem[], regionCode: string): string { ... }
```

---

## 🌲 Git Workflow & Version Control

We follow clear conventions to keep our history clean and manageable.

### 🌿 Branch Naming

Name your branches based on the type of work:

- `feature/description-of-feature` - New features (e.g., `feature/user-profile-page`)
- `bugfix/description-of-bug` - Non-critical bug fixes (e.g., `bugfix/fix-search-debounce`)
- `hotfix/description` - Critical production fixes (e.g., `hotfix/payment-gateway-crash`)
- `chore/description` - Maintenance/setup (e.g., `chore/upgrade-dependencies`)

### 📝 Commit Messages

We follow the **Conventional Commits** specification.
Format: `type(scope?): subject`

- **feat:** A new feature
- **fix:** A bug fix
- **hotfix:** A critical bug fix for production
- **chore:** Changes to build process or auxiliary tools and libraries
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **perf:** A code change that improves performance

**Examples:**
- `feat(search): add autocomplete functionality`
- `fix(auth): resolve login redirect loop`
- `docs: update readme with setup instructions`

### 🔄 Pull Request (PR) Messages

A good PR description ensures reviewers understand context and testing.

**Template:**

```markdown
### 🎯 Goal
Briefly explain what this PR accomplishes.

### 🛠 Implementation Details
- Added X component
- Modified Y function to handle nulls
- Updated Z store

### 🧪 Testing
- [ ] Verified manually on Chrome
- [ ] Checked responsive layout on Mobile
- [ ] Unit tests added/passed
```

---

## 🚀 Key Takeaways

1.  **Check Modules First:** Before creating a new top-level folder, check if your code belongs to an existing module (e.g. `search`, `product`).
2.  **Server vs Client:** Next.js uses Server Components by default. Add `'use client'` strictly when you need hooks or interactivity.
3.  **Performance:**
    - Use `<Image />` from `next/image`.
    - Debounce heavy inputs (search bars).
    - Leverage `React.memo` for expensive renders if profiling suggests it.
