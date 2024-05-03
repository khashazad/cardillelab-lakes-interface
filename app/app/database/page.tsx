import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectionSection from "./connection-section";
import RequirementsSection from "./requirements-section";
import AboutSection from "./about-section";
import QueriesSection from "./queries-section";

export default function DatabasePage() {
  return (
    <Tabs defaultValue="about" className="mt-4 mx-8">
      <TabsList className="w-full flex justify-evenly gap-4">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="connection">Connection</TabsTrigger>
        <TabsTrigger value="queries">Sample Queries</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <AboutSection />
      </TabsContent>
      <TabsContent value="requirements">
        <RequirementsSection />
      </TabsContent>
      <TabsContent value="connection">
        <ConnectionSection />
      </TabsContent>
      <TabsContent value="queries">
        <QueriesSection />
      </TabsContent>
    </Tabs>
  );
}
