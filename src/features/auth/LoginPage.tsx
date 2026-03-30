import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Bookmark, Bell, Tag, Eye, EyeOff } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

// ── Schemas ───────────────────────────────────────────────────────────────────
const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;
type Mode = "signin" | "signup";

// ── PasswordInput helper ──────────────────────────────────────────────────────
function PasswordInput({ value, onChange, onBlur, placeholder, autoComplete }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder: string;
  autoComplete: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} autoComplete={autoComplete} />
      <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { user, isLoading, login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>(searchParams.get("mode") === "signup" ? "signup" : "signin");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const from =
    searchParams.get("from") ||
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/";

  useEffect(() => {
    if (!isLoading && user) navigate(from, { replace: true });
  }, [user, isLoading, navigate, from]);

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const switchMode = (m: Mode) => {
    setMode(m);
    setServerError(null);
    setSuccessMsg(null);
    signInForm.reset();
    signUpForm.reset();
  };

  const handleSignIn = async (values: SignInValues) => {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleSignUp = async (values: SignUpValues) => {
    setServerError(null);
    try {
      await signup(values.email, values.password, values.name);
      setSuccessMsg("Account created! Check your email to confirm, then sign in.");
      switchMode("signin");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <Spinner className="h-10 w-10 text-secondary-foreground" />
      </div>
    );
  }

  const benefits = [
    { icon: Tag, title: "Personalized content feed", desc: "Curate a tailored feed of insights and research relevant to your journey" },
    { icon: Bookmark, title: "Saved items", desc: "Save articles, blogs, and case studies to access anytime from your dashboard" },
    { icon: Bell, title: "Email subscriptions", desc: "Get newsletters, webinars, and exclusive content delivered to your inbox" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-secondary py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <img src="/images/DQ Logo White.svg" alt="DigitalQatalyst" className="h-10" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-secondary-foreground/80 hover:text-secondary-foreground text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-linear-to-br from-secondary via-secondary/95 to-secondary/90">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left — Benefits */}
            <div className="text-secondary-foreground">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Make My DQ yours</h1>
              <p className="text-xl text-secondary-foreground/80 mb-12">Join, customize, connect</p>
              <div className="space-y-8">
                {benefits.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{title}</h3>
                      <p className="text-secondary-foreground/70">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Auth Card */}
            <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-10">
              {/* Mode toggle */}
              <div className="flex rounded-xl bg-muted p-1 mb-8">
                {(["signin", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      mode === m
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign In" : "Create Account"}
                  </button>
                ))}
              </div>

              <h2 className="font-heading text-2xl font-bold text-card-foreground mb-1 text-center">
                {mode === "signin" ? "Welcome back" : "Get started"}
              </h2>
              <p className="text-muted-foreground text-sm text-center mb-7">
                {mode === "signin"
                  ? "Sign in to access your personalized dashboard"
                  : "Create your account to access personalized insights"}
              </p>

              {successMsg && (
                <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  {successMsg}
                </div>
              )}
              {serverError && (
                <div className="mb-5 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  {serverError}
                </div>
              )}

              {/* Sign In Form */}
              {mode === "signin" && (
                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Controller control={signInForm.control} name="email" render={({ field, fieldState }) => (
                      <>
                        <Input type="email" placeholder="[email]" autoComplete="email" {...field} />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Controller control={signInForm.control} name="password" render={({ field, fieldState }) => (
                      <>
                        <PasswordInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="••••••••" autoComplete="current-password" />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <Button type="submit" disabled={signInForm.formState.isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                    {signInForm.formState.isSubmitting ? <><Spinner className="mr-2" />Signing in…</> : "Sign In"}
                  </Button>
                </form>
              )}

              {/* Sign Up Form */}
              {mode === "signup" && (
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Controller control={signUpForm.control} name="name" render={({ field, fieldState }) => (
                      <>
                        <Input placeholder="[name]" autoComplete="name" {...field} />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Controller control={signUpForm.control} name="email" render={({ field, fieldState }) => (
                      <>
                        <Input type="email" placeholder="[email]" autoComplete="email" {...field} />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Controller control={signUpForm.control} name="password" render={({ field, fieldState }) => (
                      <>
                        <PasswordInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="Min. 8 characters" autoComplete="new-password" />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Controller control={signUpForm.control} name="confirmPassword" render={({ field, fieldState }) => (
                      <>
                        <PasswordInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="Repeat your password" autoComplete="new-password" />
                        {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
                      </>
                    )} />
                  </div>
                  <Button type="submit" disabled={signUpForm.formState.isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                    {signUpForm.formState.isSubmitting ? <><Spinner className="mr-2" />Creating account…</> : "Create Account"}
                  </Button>
                </form>
              )}

              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
