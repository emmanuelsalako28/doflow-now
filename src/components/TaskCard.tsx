import { Task, TaskStatus } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-status-pending text-white" },
  "in-progress": { label: "In Progress", color: "bg-status-progress text-white" },
  completed: { label: "Completed", color: "bg-status-completed text-white" },
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const config = statusConfig[task.status];

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{task.assignedToName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(task.dueDate, "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
