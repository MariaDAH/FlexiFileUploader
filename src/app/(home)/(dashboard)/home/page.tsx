"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const options = [
  { value: "localhost", label: "Local (filesystem)" },
  { value: "vercel", label: "Remote (Vercel)" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6">
      <PageHeader
        title="File Browser"
        description="Select your storage backend"
      />

      <div className="grid py-8 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {options.map(({ value: strategy, label }) => (
          <Card key={strategy}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            {/* TODO: display total amount of files */}
            <CardContent>Files: 123</CardContent>
            <CardFooter>
              <Button variant="default" asChild>
                <Link href={`/home/${strategy}`}>
                  View <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
