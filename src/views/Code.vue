<template>
  <div>
    <pre>
      <code v-html="code" class="json"></code>
    </pre>
  </div>
</template>

<script>
// import hljs from 'highlight.js';
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/an-old-hope.css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
export default {
  name: "Code",
  components: {},
  data() {
    return {
      code: "let a = 1;\nlet b = 2;"
    };
  },
  created() {},
  mounted() {
    hljs.highlightAll();
  }
};
</script>
