// Antd
import { Empty as AntdEmpty } from "antd";

function Empty({
  description,
  height,
}: {
  description?: string;
  height?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center w-full ${
        height || "h-full"
      }`}
    >
      <AntdEmpty
        image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
        description={description}
      />
    </div>
  );
}

export default Empty;
