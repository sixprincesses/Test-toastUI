import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

const gitPlugin = () => {
  const toHTMLRenderers = {
    Git(node: any) {
      let body = node.literal;
      // body = body.split("\n");
      // body = body.join("<br/>");
      body = body.replace(/\n/g, "<br/>");
      // 정규표현식 활용하여 치환
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
  const viewerRef = useRef<Viewer>(null);

  const [testString, setTestString] = useState();
  const [testHTML, setHTML] = useState();

  const handleSave = () => {
    // viewerRef.current?.getInstance().destroy();
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    if (markDownContent.length < 10) {
      editorRef.current?.getInstance().focus(); // editor에 focus
      return;
    }
    console.log(markDownContent);
    setHTML(editorRef.current?.getInstance().getHTML());

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
        plugins={[gitPlugin, [codeSyntaxHighlight, { highlighter: Prism }]]}
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
      {testString && (
        <Viewer
          ref={viewerRef}
          initialValue={testString}
          plugins={[gitPlugin, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
      {testHTML && <div dangerouslySetInnerHTML={{ __html: testHTML }}></div>}
    </div>
  );
};
export default InstanceMd;
