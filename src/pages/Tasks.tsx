import { TaskCard } from "@/components/TaskCard";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";
import { useUser } from "@/contexts/UserContext";

const Tasks = () => {
  const { tasks: allTasks } = useTasks();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const tasks = allTasks.filter((t) => t.assignedTo === currentUser.id);
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const EmptyState = () => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-muted-foreground">Tasks will appear here when assigned to you</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground">Manage and track your assigned tasks</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {pendingTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          {inProgressTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgressTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
