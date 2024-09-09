import { useQuery, useQueryClient } from "react-query";
import { getUploadedFiles } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageCarousel from "@/app/(home)/(dashboard)/home/ImageCarousel";

interface StorageContentProps {
  strategy: string;
}

export default function StorageContent({ strategy }: StorageContentProps) {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isError, isLoading } = useQuery({
    queryKey: ["storage", strategy],
    queryFn: () => getUploadedFiles(strategy),
  });

  if (isLoading) {
    return "We are loading data...";
  }

  if (isError) {
    return "We failed to load the data";
  }

  if (!data) {
    return "Nothing to display";
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageCarousel items={data.images} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>
          {data.files.map((file) => (
            <div key={file.name}>{file.name}</div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
