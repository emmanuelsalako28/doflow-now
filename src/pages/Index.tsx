import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight, BarChart3, Users, Clock } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Onsite TaskFlow</span>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-20 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Team Task Management
              <span className="text-primary"> Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline the onsite team's workflow with intuitive task assignment, real-time progress tracking, and seamless collaboration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg px-8">
              Sign In
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-16 w-full max-w-5xl">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Track Progress</h3>
              <p className="text-muted-foreground text-center">
                Monitor task completion rates and team productivity in real-time
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Team Collaboration</h3>
              <p className="text-muted-foreground text-center">
                Assign tasks, share updates, and keep everyone on the same page
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-status-progress/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-status-progress" />
              </div>
              <h3 className="text-lg font-semibold">Meet Deadlines</h3>
              <p className="text-muted-foreground text-center">
                Set due dates and track time-sensitive tasks with ease
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex h-16 items-center justify-center text-sm text-muted-foreground">
          <p>© 2025 TaskFlow. Built with Firebase and React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
