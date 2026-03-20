import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold tracking-tight">Next.js Starter Template</h1>
        <p className="max-w-md text-muted-foreground">
          A production-ready template with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui,
          Supabase, and Zustand.
        </p>
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/auth/login">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-left md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-lg border p-4">
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const FEATURES = [
  { title: "Next.js 14", description: "App router, server components, and TypeScript." },
  { title: "Supabase", description: "Database, auth, and storage out of the box." },
  { title: "Tailwind CSS", description: "Utility-first styling with dark mode support." },
  { title: "shadcn/ui", description: "Accessible, customizable component library." },
  { title: "Zustand", description: "Lightweight global state management." },
  { title: "Vercel-ready", description: "Deploy instantly with zero configuration." },
];
