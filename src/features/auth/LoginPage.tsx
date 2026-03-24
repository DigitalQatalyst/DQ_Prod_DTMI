import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Bell, Tag, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../shared/Header/context/AuthContext";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Footer } from "../../shared/Footer/Footer";

type Mode = "signin" | "signup";

interface LocationState {
  from?: { pathname: string };
}

const LoginPage: React.FC = () => {
  const { user, isLoading, login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  const fromParam = searchParams.get("from");
  const fromState = (location.state as LocationState)?.from?.pathname;
  const from = fromParam || fromState || "/";

  const initialMode: Mode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<Mode>(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setSuccess(null);
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "signup") {
      if (!name.trim()) return setError("Full name is required");
      if (password.length < 8) return setError("Password must be at least 8 characters");
      if (password !== confirmPassword) return setError("Passwords do not match");
    }

    setSubmitting(true);
    try {
      if (mode === "signin") {
        await login(email, password);
        navigate(from, { replace: true });
      } else {
        await signup(email, password, name.trim());
        setSuccess("Account created! Check your email to confirm, then sign in.");
        switchMode("signin");
        setEmail(email);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  const benefits = [
    { icon: <Tag size={22} />, title: "Personalized content feed", desc: "Curate a tailored feed of insights and research relevant to your journey" },
    { icon: <Bookmark size={22} />, title: "Saved items", desc: "Save articles, blogs, and case studies to access anytime from your dashboard" },
    { icon: <Bell size={22} />, title: "Email subscriptions", desc: "Get newsletters, webinars, and exclusive content delivered to your inbox" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-secondary py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={isDarkMode ? "/images/DQ Logo White.svg" : "/images/DQ Logo Dark.svg"}
              alt="DigitalQatalyst"
              className="h-10"
            />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left — Benefits */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Make My DQ yours</h1>
              <p className="text-xl text-white/80 mb-12">Join, customize, connect</p>
              <div className="space-y-8">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{b.title}</h3>
                      <p className="text-white/70">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Auth Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              {/* Tab toggle */}
              <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    mode === "signin" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    mode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                {mode === "signin" ? "Welcome back" : "Get started"}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-7">
                {mode === "signin"
                  ? "Sign in to access your personalized dashboard"
                  : "Create your account to access personalized insights"}
              </p>

              {success && (
                <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Min. 8 characters" : "••••••••"}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-2"
                >
                  {submitting
                    ? mode === "signin" ? "Signing in…" : "Creating account…"
                    : mode === "signin" ? "Sign In" : "Create Account"}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-6">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
