"use client";

import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction, SignupState } from "@/features/auth/actions.server";

export default function SignupPage() {
    const [state, formAction, pending] = useActionState<SignupState, FormData>(
        signupAction,
        {}
    );

    useEffect(() => {
        toast.dismiss();

        if (state.fieldErrors) {
            Object.values(state.fieldErrors)
                .flat()
                .forEach((msg) => toast.error(msg));
        } else if (state.formError) {
            toast.error(state.formError);
        } else if (state.success) {
            toast.success("Compte créé !");
        }

    }, [state]);

    return (
        <Card className="mx-auto max-w-[980px] overflow-hidden p-0">
            <CardContent className="grid md:grid-cols-2 p-0">
                <div className="relative hidden md:block bg-muted">
                    <img
                        src="/login.png"
                        alt="Illustration signup"
                        className="absolute inset-0 h-full w-full object-cover
                       dark:brightness-[0.2] dark:grayscale"
                    />
                </div>

                <form
                    action={formAction}
                    className="flex flex-col justify-center h-full p-6 md:p-8 space-y-6"
                >
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold">Inscription</h1>
                        <p className="text-muted-foreground">
                            Rejoignez FlexiTel en quelques secondes
                        </p>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" name="firstName" required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" name="lastName" required />
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>

                    <Button type="submit" className="w-full">
                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Créer le compte
                    </Button>

                    <p className="text-center text-sm">
                        Déjà inscrit ?{" "}
                        <a href="/login" className="underline underline-offset-4">
                            Se connecter
                        </a>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
