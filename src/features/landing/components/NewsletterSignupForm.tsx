import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle,
  Bell,
  TrendingUp,
  Lightbulb,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
  interests: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const benefits = [
  {
    icon: TrendingUp,
    title: "Latest Industry Trends",
    desc: "Stay ahead with insights on digital transformation and emerging technologies",
  },
  {
    icon: Lightbulb,
    title: "Actionable Strategies",
    desc: "Practical frameworks and methodologies you can implement immediately",
  },
  {
    icon: Users,
    title: "Expert Perspectives",
    desc: "Exclusive content from industry leaders and digital transformation experts",
  },
];

export function NewsletterSignupForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      interests: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError("");
    try {
      const fd = new FormData();
      fd.append("Name", values.name);
      fd.append("Email Address", values.email);
      fd.append("Company", values.company || "Not provided");
      fd.append("Role", values.role || "Not provided");
      fd.append("Interests", values.interests || "Not provided");
      fd.append("_subject", "New Newsletter Subscription - DTMI Insights");
      fd.append("_captcha", "false");
      fd.append("_template", "table");
      fd.append("_cc", "insights@digitalqatalyst.com");
      await fetch("https://formsubmit.co/info@digitalqatalyst.com", {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 4000);
    } catch {
      setServerError(
        "Failed to submit. Please try again or contact insights@digitalqatalyst.com",
      );
    }
  };

  return (
    <section id="newsletter-signup">
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/Form_background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-secondary/75" />
        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
          {/* Left — Benefits */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="text-secondary-foreground max-w-lg">
              <div className="inline-flex items-center px-4 py-2 bg-secondary-foreground/10 backdrop-blur-sm rounded-full mb-6 border border-secondary-foreground/20">
                <Bell className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">
                  DTMI Insights Newsletter
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight text-center">
                Stay Updated with Our Insights
              </h2>
              <p className="text-xl text-secondary-foreground/90 mb-8 leading-relaxed">
                Get exclusive access to cutting-edge research, AI-driven
                strategies, and actionable insights delivered directly to your
                inbox.
              </p>
              <ul className="space-y-4">
                {benefits.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start">
                    <Icon className="mr-4 shrink-0 mt-1 h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{title}</h3>
                      <p className="text-secondary-foreground/80 text-sm">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="bg-card rounded-xl shadow-2xl p-8 w-full max-w-xl">
              <h3 className="font-heading text-2xl font-bold text-card-foreground mb-6 text-center">
                Subscribe to DTMI Insights
              </h3>

              {success ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-card-foreground mb-2">
                    Welcome aboard!
                  </h4>
                  <p className="text-muted-foreground">
                    You are now subscribed to DTMI Insights. Check your inbox
                    for a confirmation email.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {serverError && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-sm text-destructive">
                          {serverError}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="[name]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="[email]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Company{" "}
                              <span className="text-muted-foreground">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Job Title{" "}
                              <span className="text-muted-foreground">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your Role" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topics of Interest</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="digital-transformation">
                                Digital Transformation
                              </SelectItem>
                              <SelectItem value="ai-innovation">
                                AI & Innovation
                              </SelectItem>
                              <SelectItem value="industry-4.0">
                                Industry 4.0
                              </SelectItem>
                              <SelectItem value="data-analytics">
                                Data & Analytics
                              </SelectItem>
                              <SelectItem value="change-management">
                                Change Management
                              </SelectItem>
                              <SelectItem value="all-topics">
                                All Topics
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <p className="text-xs text-muted-foreground pt-1">
                      By subscribing, you agree to receive emails from
                      DigitalQatalyst. You can unsubscribe at any time.
                    </p>

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Spinner className="mr-2" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
