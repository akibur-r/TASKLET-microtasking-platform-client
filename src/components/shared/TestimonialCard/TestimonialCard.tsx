import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/types/TestimonialType/TestimonialType";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="bg-transparent border-none shadow-none p-4 max-h-64 text-center">
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="size-16">
            <AvatarImage src={testimonial.avatar} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        <div className="flex justify-center gap-1 mt-2 text-yellow-400">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400" />
          ))}
        </div>
        <div className="text-sm text-muted-foreground italic">
          “{testimonial.feedback}”
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
