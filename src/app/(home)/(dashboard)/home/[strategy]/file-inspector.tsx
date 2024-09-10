import type { File } from "@/context/types";
import prettyBytes from "pretty-bytes";

interface FileInspectorProps {
  file?: File;
}

export default function FileInspector({ file }: FileInspectorProps) {
  if (!file) {
    return "Select the file in the browser";
  }

  const isImage = file.name.match(/\.(jpe?g|png|gif)$/i);

  return (
    <div className="flex flex-col gap-y-8" data-id="file-inspector">
      <h2 className="text-lg text-center font-semibold text-nowrap text-ellipsis overflow-hidden">
        {file.name}
      </h2>

      {isImage && (
        <img
          src={file.url}
          alt={`Preview of ${file.name}`}
          className="rounded-md"
        />
      )}

      <div className="grid grid-cols-2">
        <div>Size</div>
        <div className="font-medium">{prettyBytes(file.size)}</div>

        <div>Uploaded at</div>
        <div className="font-medium">
          {file.uploadedAt?.toString() ?? "n/a"}
        </div>
      </div>
    </div>
  );
}
