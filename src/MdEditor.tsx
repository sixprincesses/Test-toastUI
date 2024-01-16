import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useRef } from "react";

import { Editor } from "@toast-ui/react-editor";

const gitPlugin = () => {
  const toHTMLRenderers = {
    Git(node: any) {
      const body = node.literal;

      return [
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: { style: "color:hotpink;" },
        },
        { type: "html", content: body },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
};

const MdEditor = () => {
  const editorRef = useRef<Editor>(null);

  const handleSave = () => {
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    if (markDownContent.length < 10) {
      editorRef.current?.getInstance().focus(); // editor에 focus
      return;
    }
    console.log(markDownContent);
  };

  return (
    <div className="MarkDownEditor" style={{ width: "80vw", margin: "80px" }}>
      <h2>Toast UI Test</h2>
      <Editor
        ref={editorRef}
        placeholder="여기에 입력 해주세요."
        previewStyle="vertical"
        initialEditType="markdown"
        hideModeSwitch={true}
        theme="dark"
        usageStatistics={false}
        initialValue={["$$Git", "gngngngngngng", "$$"].join("\n")}
        plugins={[gitPlugin]}
      />
      <button
        className="MarkDownSendingBtn"
        style={{
          margin: "20px",
          backgroundColor: "greenyellow",
          color: "green",
        }}
        onClick={handleSave}
      >
        저장하기
      </button>
    </div>
  );
};

export default MdEditor;
