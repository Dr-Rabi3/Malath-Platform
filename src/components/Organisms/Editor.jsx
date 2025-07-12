// import SimpleEditor from "./SimpleEditor";
// import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

import { motion } from "motion/react";
import SimpleEditor from "../Molecules/SimpleEditor";
import { Form } from "antd";

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

function Editor({ content = "", readOnly, field, limited }) {
  return (
    <motion.div className="space-y-2 w-full h-full" variants={fieldVariants}>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue, setFieldsValue }) => (
          <SimpleEditor
            limited={limited}
            readOnly={readOnly}
            value={getFieldValue(field || "description") || content}
            onChange={(value) => {
              setFieldsValue({ [field || "description"]: value });
            }}
          />
        )}
      </Form.Item>
    </motion.div>
  );
}
export default Editor;
