import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const statusConfig = {
  pending: { label: "Pending", color: "bg-status-pending text-white" },
  "in-progress": { label: "In Progress", color: "bg-status-progress text-white" },
  completed: { label: "Completed", color: "bg-status-completed text-white" },
};

const TaskDetail = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [progress, setProgress] = useState(0);

  // Mock task data
  const task = {
    id: "1",
    title: "Sample Task",
    description: "This is a sample task description",
    status: "pending" as TaskStatus,
    assignedTo: "1",
    assignedToName: "John Doe",
    createdBy: "1",
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    progress: 0,
  };

  const handleUpdate = async () => {
    setUpdating(true);
    
    // Simulate update
    setTimeout(() => {
      toast.success("Task updated successfully!");
      setUpdating(false);
      navigate("/dashboard");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const canEdit = true;
  const config = statusConfig[task.status];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>
            <Badge className={config.color}>{config.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">Assigned to:</span>
              <span>{task.assignedToName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Due:</span>
              <span>{format(task.dueDate, "PPP")}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Current Progress</span>
                <span className="text-muted-foreground">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-3" />
            </div>

            {canEdit && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="status">Update Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Update Progress: {progress}%</Label>
                  <Slider
                    value={[progress]}
                    onValueChange={(value) => setProgress(value[0])}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Button onClick={handleUpdate} disabled={updating} className="w-full">
                  {updating ? "Updating..." : "Save Changes"}
                </Button>
              </>
            )}

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetail;
