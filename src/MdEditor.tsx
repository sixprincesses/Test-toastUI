import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";

const gitPlugin = () => {
  const toHTMLRenderers = {
    Git(node: any) {
      const body = node.literal;

      return [
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: { style: `color:hotpink; background-color:black` },
        },
        { type: "html", content: body },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
};

const InstanceMd = () => {
  const editorRef = useRef<Editor>(null);

  const [testString, setTestString] = useState();

  const handleSave = () => {
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    if (markDownContent.length < 10) {
      editorRef.current?.getInstance().focus(); // editor에 focus
      return;
    }
    console.log(markDownContent);
    setTestString(markDownContent);
  };

  return (
    <div className="MarkDownEditor" style={{ width: "80vw", margin: "80px" }}>
      <h2>Toast UI Test</h2>
      <Editor
        ref={editorRef}
        height="400px"
        placeholder="여기에 입력 해주세요."
        previewStyle="tab"
        initialEditType="markdown"
        hideModeSwitch={true}
        theme="dark"
        usageStatistics={false}
        initialValue="# 이곳에 입력해주세요"
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
      {testString && <Viewer initialValue={testString} plugins={[gitPlugin]} />}
    </div>
  );
};

export default InstanceMd;
