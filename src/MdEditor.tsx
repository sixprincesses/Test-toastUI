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
    GitPlus(node: any) {
      let body = node.literal;
      const bodyList = body.split(" ");
      console.log(bodyList);
      return [
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: {
            style: `color:hotpink; background-color:black; display: grid; grid-template-columns: 20px 30px 30px 22px 1fr;`,
          },
        },
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: {
            // style: `color:hotpink; background-color:black; display: grid; grid-template-columns: 20px 30px 30px 22px 1fr;`,
            style: `color:hotpink; background-color:black;`,
          },
        },
        {
          type: "html",
          content: bodyList[0],
        },
        { type: "closeTag", tagName: "div", outerNewLine: true },
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: {
            // style: `color:hotpink; background-color:black; display: grid; grid-template-columns: 20px 30px 30px 22px 1fr;`,
            style: `color:hotpink; background-color:black;`,
          },
        },
        {
          type: "html",
          content: bodyList[1],
        },
        { type: "closeTag", tagName: "div", outerNewLine: true },
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: {
            // style: `color:hotpink; background-color:black; display: grid; grid-template-columns: 20px 30px 30px 22px 1fr;`,
            style: `color:hotpink; background-color:black;`,
          },
        },
        {
          type: "html",
          content: bodyList[2],
        },
        { type: "closeTag", tagName: "div", outerNewLine: true },
        {
          type: "openTag",
          tagName: "div",
          outerNewLine: true,
          attributes: {
            // style: `color:hotpink; background-color:black; display: grid; grid-template-columns: 20px 30px 30px 22px 1fr;`,
            style: `color:hotpink; background-color:black;`,
          },
        },
        {
          type: "html",
          content: bodyList[3],
        },
        { type: "closeTag", tagName: "div", outerNewLine: true },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
};

const InstanceMd = () => {
  const editorRef = useRef<Editor>(null);
  const viewerRef = useRef<Viewer>(null);

  console.log(editorRef.current?.getInstance().getMarkdown());

  const [testString, setTestString] = useState(
    editorRef.current?.getInstance().getMarkdown()
  );

  viewerRef.current?.getInstance().setMarkdown(testString);
  const handleSave = () => {
    // viewerRef.current?.getInstance().destroy();
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    if (markDownContent.length < 10) {
      editorRef.current?.getInstance().focus(); // editor에 focus
      return;
    }
    console.log(editorRef.current?.getInstance().getHTML());
    console.log(markDownContent);

    setTestString(markDownContent);
    viewerRef.current?.getInstance().setMarkdown(testString);
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
        onChange={handleSave}
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
      <Viewer
        ref={viewerRef}
        initialValue={testString}
        plugins={[gitPlugin, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
};
export default InstanceMd;
