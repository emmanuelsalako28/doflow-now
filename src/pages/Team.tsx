import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useTasks } from "@/contexts/TaskContext";

const Team = () => {
  const { users } = useUser();
  const { tasks } = useTasks();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Members</h1>
        <p className="text-muted-foreground">View all team members and their task statistics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((member) => {
          const memberTasks = tasks.filter((t) => t.assignedTo === member.id);
          const pendingCount = memberTasks.filter((t) => t.status === "pending").length;
          const inProgressCount = memberTasks.filter((t) => t.status === "in-progress").length;
          const completedCount = memberTasks.filter((t) => t.status === "completed").length;

          return (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <Badge variant={member.role === "admin" ? "default" : "secondary"} className="capitalize">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending:</span>
                    <span className="font-medium">{pendingCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In Progress:</span>
                    <span className="font-medium">{inProgressCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">{completedCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
