import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <p className="mb-4">
            <strong>Email:</strong> {user?.email}
          </p>
          <Button
            onClick={logout}
            className="mt-6"
            variant="outline"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}