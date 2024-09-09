import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <div>
        <h3 className="text-4xl font-semibold">{title}</h3>
        {description && (
          <p className="text-base text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
    </>
  );
}
