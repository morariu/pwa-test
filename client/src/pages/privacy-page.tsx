
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            This is a sample Privacy Policy page. Replace this content with your actual privacy policy.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
