"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

export function LogoutButton() {
  const router = useRouter();
  const reset = useAuthStore((state) => state.reset);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    reset();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sign out
    </Button>
  );
}
