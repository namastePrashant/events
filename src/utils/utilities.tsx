import { message, Row } from "antd";
import { ImImage } from "react-icons/im";

export const showStatusCompleteMsg = () => {
  message.info(
    "Task has already been completed. This can be edited only if it is incomplete state."
  );
};

export const extractTextForHeader = (notes?: any) => {
  let hasMedia = false;
  const parser = new DOMParser();
  const $newTable = parser.parseFromString(notes, "text/html");
  const $row: any = $newTable.querySelector("img");

  if ($row) {
    hasMedia = true;
  }

  return (
    <Row>
      <div className="header-notes print-notes">
        {notes
          ?.replace(/<[^>]*>?/gm, " ")
          ?.replace(/\&nbsp;/g, " ")
          ?.replace(/&amp;/g, "&")}
      </div>
      {hasMedia ? <ImImage size={20} style={{ marginLeft: 5 }} /> : " "}
    </Row>
  );
};
