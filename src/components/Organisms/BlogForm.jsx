import { useState } from "react";
import BlogEditor from "../Molecules/SimpleEditor";

function BlogForm() {
  const [html, setHtml] = useState("");
  const handleSave = () => {
    console.log("Blog HTML:", html); // send to backend
  };
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Write Your Blog</h1>
      <BlogEditor onChange={setHtml} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        Save Blog
      </button>
      <h2 className="text-xl mt-6">Preview</h2>
      <div
        className="mt-2 p-4 border rounded prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default BlogForm;
