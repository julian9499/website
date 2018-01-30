// Compiled using marko@4.7.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/dropout$1.0.0/files/dropout.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><style>\n        @keyframes font {\n            0%   {font-size: 3.6vw;}\n            50%  {font-size: 4.1vw;}\n            100% {font-size: 3.6vw;}\n        }\n\n        @keyframes rotate { \n            0% { transform: rotate(0deg); }\n            25% { transform: rotate(15deg); }\n            50% { transform: rotate(0deg); }\n            75% { transform: rotate(-15deg); }\n            100% { transform: rotate(0deg); }\n        }\n\n        .wrapper { \n            height: 100%;\n            width: 100%;\n            left:0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            position: absolute;\n            background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);\n            background-size: 1800% 1800%;\n            animation: rainbow 18s ease infinite;\n        }\n\n        @keyframes rainbow { \n            0%{background-position:0% 82%}\n            50%{background-position:100% 19%}\n            100%{background-position:0% 82%}\n        }\n\n        .text {\n            animation: font 0.545454545454s 2.5s infinite, rotate 4.363636363636s 2.5s infinite;\n        }\n\n        @font-face {\n            font-family: \"Comic Sans WF\";\n            src: url(\"assets/comic_sans.ttf\") format(\"truetype\");\n        }\n\n        body {\n            overflow-x: hidden;\n        }\n\n        .content {\n            width: 100%;\n            height: 10%;\n\n            position:absolute;\n            left:0; right:0;\n            top:0; bottom:0;\n            margin:auto;\n\n            max-width:100%;\n            max-height:100%;\n            font-size: 3.6vw;\n            text-align: center;\n            overflow: visible;\n            font-family: \"Comic Sans WF\", \"Comic Sans MS\", \"Comic Sans\";\n        }\n    </style><script>\n        setInterval(function() {\n        var ajax = new XMLHttpRequest();\n        ajax.onreadystatechange = function()\n        {\n            if(ajax.readyState == 4 && ajax.status == 200)\n            {\n                document.getElementById('dropouts').textContent = parseFloat(ajax.responseText).toFixed(2);\n            }\n        }\n        ajax.open(\"get\", \"/api/dropouts\"); \n        ajax.send();\n    }, 1000);\n    </script></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"wrapper\"><div style=\"display:none;overflow:hidden\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/rY0WxgSXdEE?rel=0&amp;amp;controls=0&amp;amp;showinfo=0&amp;amp;start=5&amp;amp;autoplay=1&amp;amp;loop=1&amp;amp;playlist=rY0WxgSXdEE\" frameborder=\"0\" allowfullscreen></iframe></div><div class=\"content\"><div class=\"text\">Minstens <span id=\"dropouts\">" +
    marko_escapeXml(data.dropouts) +
    "</span> mensen hebben CSE al opgegeven</div></div></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "11");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/dropout$1.0.0/files/dropout.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
