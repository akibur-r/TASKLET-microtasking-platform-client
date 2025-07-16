import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

const BlogsSection = () => {
  return (
    <div>
      <section className="max-w-screen-xl mx-auto p-4 space-y-8">
        <SectionHeader
          name="How it Works"
          className="text-center lg:text-left"
        />
        <main className="grid md:grid-cols-2 gap-y-4 gap-x-8">
          <Card className="bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <UserCircle className="size-16 p-2 bg-accent/40 rounded-full text-white" />
              <h3 className="text-2xl font-bold dark:text-accent">Sign Up</h3>
              <p className="text-center opacity-70">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laboriosam voluptate a quae, minima
              </p>
            </CardContent>
          </Card>
          <Card className="bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <UserCircle className="size-16 p-2 bg-accent/40 rounded-full text-white" />
              <h3 className="text-2xl font-bold dark:text-accent">Sign Up</h3>
              <p className="opacity-70">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laboriosam voluptate a quae, minima
              </p>
            </CardContent>
          </Card>
        </main>
      </section>
    </div>
  );
};

export default BlogsSection;
