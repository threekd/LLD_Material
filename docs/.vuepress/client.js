import { defineClientConfig } from 'vuepress/client';
import { defineMermaidConfig } from 'vuepress-plugin-md-enhance/client';

defineMermaidConfig({
  theme: 'default',
  themeVariables: {
    mainBkg: '#E6E6FA',            // 节点背景颜色（Lavender）
    nodeBkg: '#E6E6FA',
    nodeBorder: '#9370DB',         // 节点边框颜色（Medium Purple）
    nodeTextColor: '#4B0082',      // 节点文字颜色（Indigo）
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    fontSize: '16px',
    // 调整手绘效果参数
    roughness: 2.5,                // 增加粗糙度
    bowing: 1.5,                   // 增加弯曲度
  },
  themeCSS: `
    /* 自定义节点样式，增强手绘效果 */
    .node rect, .node polygon {
      rx: 10;
      ry: 10;
    }
    /* 边线样式 */
    .edgePath path {
      stroke-width: 2px;
    }
    /* 标签字体 */
    .label {
      font-family: 'Comic Sans MS', 'Comic Sans', cursive;
    }
    /* 斜线背景 */
    .mermaid {
      background-color: #FFFFFF; /* 基础背景颜色 */
      background-image: url("data:image/svg+xml,%3Csvg%20width='10'%20height='10'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cline%20x1='0'%20y1='10'%20x2='10'%20y2='0'%20stroke='%23D8BFD8'%20stroke-width='1'/%3E%3C/svg%3E");
    }
  `,
  flowchart: {
    curve: 'basis',
    useMaxWidth: false,
  },
  securityLevel: 'loose',
});

export default defineClientConfig({
  // 客户端配置
});