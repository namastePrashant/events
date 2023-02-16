import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { message } from "antd";

import { BASE_URL, UPLOAD_MEDIA } from "../../../constants/url";

interface AppCkeditorInterface {
  value?: any;
  onChange?: any;
}

const AppCkeditor: React.FC<AppCkeditorInterface> = (props) => {
  const { value, onChange } = props;

  function uploadAdapter(loader?: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file?: any) => {
            body.append("file", file);
            let headers = new Headers();
            headers.append(
              "Authorization",
              `Bearer ${localStorage.getItem("aioToken")}`
            );
            fetch(`${BASE_URL}${UPLOAD_MEDIA}`, {
              method: "post",
              body: body,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("aioToken")}`,
                Accept: "application/json",
              },
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                if (!res?.success) {
                  message.error(res?.message);
                }
                resolve({
                  default: `${res.data}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader?: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={Editor}
      config={{
        extraPlugins: [uploadPlugin],
        removePlugins: ["MediaEmbed"],
      }}
      data={value}
      onReady={() => {
        // You can store the "editor" and use when it is needed.
        // console.log("Editor is ready to use!");
      }}
      onChange={(event?: any, editor?: any) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        onChange(data);
      }}
      onBlur={(event?: any, editor?: any) => {
        // console.log("Blur.", editor);
      }}
      onFocus={(event?: any, editor?: any) => {
        // console.log("Focus.", editor);
      }}
    />
  );
};

export default AppCkeditor;
