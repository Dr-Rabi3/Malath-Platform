import { motion } from "framer-motion";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
// import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { Link } from "@/components/tiptap-extension/link-extension";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { ListButton } from "@/components/tiptap-ui/list-button";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { Separator } from "@/components/tiptap-ui-primitive/separator";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import suggestion from "../tiptap/suggestion.js";

import "../tiptap/suggestion.js";
import "@/components/tiptap-node/image-upload-node/image-upload-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import { useTranslation } from "react-i18next";

// const limit = 5000;
function SimpleEditor({ value, onChange, readOnly, limited = 5000 }) {
  const { t } = useTranslation();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      Link.configure({ openOnClick: false }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
      Link,
      Image,
      Superscript,
      Subscript,
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({
        limited,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  const insertHorizontalRule = () => {
    if (!editor) return;
    editor.chain().focus().setHorizontalRule().run();
    setTimeout(() => {
      document.querySelectorAll("hr").forEach((hr) => {
        hr.classList.add("border-gray-900", "dark:border-white", "!m-0");
      });
    }, 100);
  };
  const percentage = editor
    ? Math.round((100 / limited) * editor.storage.characterCount.characters())
    : 0;
  return (
    <EditorContext.Provider value={{ editor }}>
      <motion.div
        className="border rounded-lg bg-background "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!readOnly && (
          <div className="flex items-center justify-center gap-3 border-b-[1px] border-[#E1E1E2] px-2 py-1 flex-wrap">
            <div className="tiptap-button-group" data-orientation="horizontal">
              <UndoRedoButton action="undo" />
              <UndoRedoButton action="redo" />
            </div>
            <Separator />
            <div className="tiptap-button-group" data-orientation="horizontal">
              <HeadingDropdownMenu
                levels={[1, 2, 3, 4, 5, 6]}
                onOpenChange={(value) => console.log(value)}
              />
            </div>
            <Separator />
            <div className="tiptap-button-group" data-orientation="horizontal">
              <TextAlignButton align="left" />
              <TextAlignButton align="center" />
              <TextAlignButton align="right" />
              <TextAlignButton align="justify" />
            </div>
            <Separator />
            <div className="tiptap-button-group" data-orientation="horizontal">
              <ListButton type="bulletList" />
              <ListButton type="orderedList" />
              <ListButton type="taskList" />
            </div>
            <Separator />
            <div className="tiptap-button-group" data-orientation="horizontal">
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="strike" />
              <MarkButton type="underline" />
            </div>
            <Separator />
            <div className="tiptap-button-group" data-orientation="horizontal">
              <LinkPopover />
            </div>
            {/* <div className="tiptap-button-group" data-orientation="horizontal">
            <ImageUploadButton text="Add" />
          </div> */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={insertHorizontalRule}
              className="p-1"
            >
              ─
            </motion.button>
          </div>
        )}

        {editor && (
          <EditorContent
            editor={editor}
            className="mt-2 p-2 rounded-md w-full min-h-[200px]"
            placeholder="sdfs"
          />
        )}
        {!readOnly && editor && (
          <div
            className={`character-count flex gap-2 justify-end m-2  ${
              editor.storage.characterCount.characters() === limited
                ? "character-count--warning"
                : ""
            }`}
          >
            <svg height="20" width="20" viewBox="0 0 20 20">
              <circle r="10" cx="10" cy="10" fill="#e9ecef" />
              <circle
                r="5"
                cx="10"
                cy="10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
              />
              <circle r="6" cx="10" cy="10" fill="white" />
            </svg>
            {editor.storage.characterCount.characters()} / {limited}{" "}
            {t("addService.characters")}
          </div>
        )}
      </motion.div>
    </EditorContext.Provider>
  );
}
export default SimpleEditor;
