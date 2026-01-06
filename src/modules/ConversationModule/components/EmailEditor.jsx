/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useRef, useEffect } from "react";
//? Assets
import JoditEditor from "jodit-react";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

const ArcEmailEditor = ({ ArcOffCanvaShow, content, setContent }) => {
  const editor = useRef(null);
  //   const [content, setContent] = useState("");

  const config = {
    toolbarAdaptive: false,
    disablePlugins: "about",
    buttons:
      "source,|,bold,italic,underline,strikethrough,eraser,|,ul,ol,|,font,fontsize,brush,paragraph,lineHeight,|,indent,outdent,\n,image,|,left,center,right,|,link,|,selectall,copy,|,hr,table,symbols,|,undo,redo,|,find,fullsize,preview,print,|,classSpan",
  };
  useEffect(() => {
    const removeUnwantedDiv = () => {
      const unwantedDiv = document.querySelector(
        ".jodit-status-bar__item-right a.jodit-status-bar-link"
      );

      if (unwantedDiv && unwantedDiv.innerHTML.trim() !== "") {
        unwantedDiv.remove();
      }
    };

    // Delay execution to ensure DOM updates
    const timeout = setTimeout(removeUnwantedDiv, 100);

    return () => clearTimeout(timeout);
  }, [ArcOffCanvaShow]);
  return (
    <React.Fragment>
      <div className="arc-email-editior">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            console.log(newContent);
          }}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      </div>
    </React.Fragment>
  );
};
export default ArcEmailEditor;
