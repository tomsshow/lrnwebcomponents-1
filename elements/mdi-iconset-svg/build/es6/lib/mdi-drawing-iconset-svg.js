import "../node_modules/@polymer/iron-icon/iron-icon.js";
import "../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js";
import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
const template = html`<iron-iconset-svg name="mdi-drawing" size="24">
  <svg>

    <g id="pencil">
      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
    </g>

  </svg>
</iron-iconset-svg>`;
document.head.appendChild(template.content);