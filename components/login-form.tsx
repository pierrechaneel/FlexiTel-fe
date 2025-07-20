"use client";

import { useActionState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginAction, { LoginState } from "@/features/auth/actions.server";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
 
 const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  useEffect(() => {
    toast.dismiss();       
    if (state.formError) {
      toast.error(state.formError);
    } else if (state.success) {
      toast.success("Connexion réussie !");
    }
    
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-6 md:p-8 flex flex-col justify-center h-full space-y-6">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-2xl font-bold">Bienvenu sur FlexiTel</h1>
              <p className="text-muted-foreground">La flexibilité sur les offres</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Ou continuer avec
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* vos boutons SSO */}
            </div>
            <p className="text-center text-sm">
              Pas encore un compte?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Créer un compte
              </Link>
            </p>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login.png"
              alt="Illustration login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
