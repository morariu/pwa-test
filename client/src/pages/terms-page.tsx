
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-2xl font-semibold tracking-tight">Terms of Service</h1>
              <p className="text-sm text-muted-foreground mt-4">
                By using our service, you agree to the following terms:
              </p>
              <div className="mt-4 space-y-4">
                <p>1. This is a sample terms page for demonstration purposes.</p>
                <p>2. Replace this content with your actual terms of service.</p>
                <p>3. The styling matches the authentication page for consistency.</p>
                <p>4. You can customize this content and styling as needed.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
