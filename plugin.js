// var wordsToCheck = ["bad", "yak", "Shoot", "commands"];

// var privileges = ["cellValue", "configuration"];

// var templateCell_$PLUGIN_ID = document.createElement("template");
// templateCell_$PLUGIN_ID.innerHTML = `
//   <style>
//     #container {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       justify-content: space-between;
//       height: 100%;
//       width: calc(100% - 16px);
//       padding: 0 8px;
//     }
//     input {
//       height: 100%;
//       flex: 1;
//       background-color: transparent;
//       border: 0;
//       min-width: 0;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//     input:focus {
//       outline: none;
//     }
//   </style>
//   <div id="container">
//     <input type="text" id="image-value" placeholder="Enter URL...">
//     <button id="view-image">Analyze</button>
//   </div>
// `;

// var templateEditor_$PLUGIN_ID = document.createElement('template')
// templateEditor_$PLUGIN_ID.innerHTML = `
//   <style>
//     #container {
//       width: 150px;
//       max-width:400px;
//     }
//     #image-old {
//       width:100%;
//       height:100%;
//     }
//     #image {
//       background-size: contain;
//       background-repeat:no-repeat;
//       max-width:400px;
//     }
//     #background-image {
//       background-repeat:no-repeat;
//       background-size:contain;
//       height:100px;
//       display:flex;
//       align-items:center;
//       justify-content:center;
//     }
//   </style>
//   <div id="container">
//     <div id="background-image"></div>
//   </div>
// `

// class OuterbasePluginConfig_$PLUGIN_ID {
//   constructor(object) {}
// }

// class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
//   static get observedAttributes() {
//     return privileges;
//   }

//   config = new OuterbasePluginConfig_$PLUGIN_ID({});

//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
//   }

//   connectedCallback() {
//     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
//       JSON.parse(this.getAttribute("configuration"))
//     );
//     var cellValue = this.getAttribute("cellvalue");
//     this.shadow.querySelector("#image-value").value = cellValue;
//     var imageInput = this.shadow.getElementById("image-value");
//     var viewImageButton = this.shadow.getElementById("view-image");

//     if (imageInput && viewImageButton) {
//       imageInput.addEventListener("focus", () => {
//         console.log("onstopedit 1");
//         this.callCustomEvent({
//           action: "onstopedit",
//           value: true,
//         });
//       });

//       imageInput.addEventListener("blur", () => {
//         this.callCustomEvent({
//           action: "cellvalue",
//           value: imageInput.value,
//         });
//         this.callCustomEvent({
//           action: "onstopedit",
//           value: true,
//         });
//       });

//       viewImageButton.addEventListener("click", () => {
//         var containsWords = wordsToCheck.some((word) =>
//           cellValue.includes(word)
//         );
//         var message = containsWords ? "contains words" : "no";
//         imageInput.value = message;
//         this.callCustomEvent({
//           action: "onedit",
//           value: true,
//         });
//       });
//     }
//   }

//   callCustomEvent(data) {
//     const event = new CustomEvent("custom-change", {
//       detail: data,
//       bubbles: true,
//       composed: true,
//     });

//     this.dispatchEvent(event);
//   }
// }

// class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
//   static get observedAttributes() {
//     return privileges;
//   }

//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
//     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
//       JSON.parse(this.getAttribute("configuration"))
//     );
//   }

//   connectedCallback() {
//     var cellValue = this.getAttribute("cellvalue");
//     var containsWords = wordsToCheck.some((word) => cellValue.includes(word));
//     var message = containsWords ? "contains words" : "no";
//     var backgroundImageView = this.shadow.getElementById("background-image");
//     if (backgroundImageView) {
//       backgroundImageView.innerHTML = message;
//     }
//     backgroundImageView.style.backgroundColor = 'blue';
//             backgroundImageView.style.color = 'white';
//   }
// }

// window.customElements.define(
//   "outerbase-plugin-cell-$PLUGIN_ID",
//   OuterbasePluginCell_$PLUGIN_ID
// );
// window.customElements.define(
//   "outerbase-plugin-editor-$PLUGIN_ID",
//   OuterbasePluginEditor_$PLUGIN_ID
// );

// //working same code without the word "image"
var wordsToCheck = ["bad", "yak", "Shoot", "commands"];

var privileges = ["cellValue", "configuration"];

var templateCell_$PLUGIN_ID = document.createElement("template");
templateCell_$PLUGIN_ID.innerHTML = `
  <style>
    #container {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      height: 100%;
      width: calc(100% - 16px);
      padding: 0 8px;
    }
    input {
      height: 100%;
      flex: 1;
      background-color: transparent;
      border: 0;
      min-width: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    input:focus {
      outline: none;
    }
  </style>
  <div id="container">
    <input type="text" id="content-value" placeholder="Enter URL...">
    <button id="view-content">Analyze</button>
  </div>
`;

var templateEditor_$PLUGIN_ID = document.createElement('template')
templateEditor_$PLUGIN_ID.innerHTML = `
  <style>
    #container {
      width: 150px;
      max-width:400px;
    }
    #content-old {
      width:100%;
      height:100%;
    }
    #content {
      background-size: contain;
      background-repeat:no-repeat;
      max-width:400px;
    }
    #background-content {
      background-repeat:no-repeat;
      background-size:contain;
      height:100px;
      display:flex;
      align-items:center;
      justify-content:center;
    }
  </style>
  <div id="container">
    <div id="background-content"></div>
  </div>
`

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor(object) {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
  }

  connectedCallback() {
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
    var cellValue = this.getAttribute("cellvalue");
    this.shadow.querySelector("#content-value").value = cellValue;
    var contentInput = this.shadow.getElementById("content-value");
    var viewContentButton = this.shadow.getElementById("view-content");

    if (contentInput && viewContentButton) {
      contentInput.addEventListener("focus", () => {
        console.log("onstopedit 1");
        this.callCustomEvent({
          action: "onstopedit",
          value: true,
        });
      });

      contentInput.addEventListener("blur", () => {
        this.callCustomEvent({
          action: "cellvalue",
          value: contentInput.value,
        });
        this.callCustomEvent({
          action: "onstopedit",
          value: true,
        });
      });

      viewContentButton.addEventListener("click", () => {
        var containsWords = wordsToCheck.some((word) =>
          cellValue.includes(word)
        );
        var message = containsWords ? "contains words" : "no";
        contentInput.value = message;
        this.callCustomEvent({
          action: "onedit",
          value: true,
        });
      });
    }
  }

  callCustomEvent(data) {
    const event = new CustomEvent("custom-change", {
      detail: data,
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }
}

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
  }

  connectedCallback() {
    var cellValue = this.getAttribute("cellvalue");
    var containsWords = wordsToCheck.some((word) => cellValue.includes(word));
    var message = containsWords ? "contains words" : "no";
    var backgroundContentView = this.shadow.getElementById("background-content");
    if (backgroundContentView) {
      backgroundContentView.innerHTML = message;
    }
    backgroundContentView.style.backgroundColor = 'blue';
    backgroundContentView.style.color = 'white';
  }
}

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);
window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);

// Testing openai
// var privileges = ["cellValue", "configuration"];

// var templateCell_$PLUGIN_ID = document.createElement("template");
// templateCell_$PLUGIN_ID.innerHTML = `
//   <style>
//     #container {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       justify-content: space-between;
//       height: 100%;
//       width: calc(100% - 16px);
//       padding: 0 8px;
//     }
//     input {
//       height: 100%;
//       flex: 1;
//       background-color: transparent;
//       border: 0;
//       min-width: 0;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//     input:focus {
//       outline: none;
//     }
//   </style>
//   <div id="container">
//     <input type="text" id="content-value" placeholder="Enter URL...">
//     <button id="view-content">Analyze</button>
//   </div>
// `;

// var templateEditor_$PLUGIN_ID = document.createElement("template");
// templateEditor_$PLUGIN_ID.innerHTML = `
//   <style>
//     #container {
//       width: 150px;
//       max-width:400px;
//     }
//     #content-old {
//       width:100%;
//       height:100%;
//     }
//     #content {
//       background-size: contain;
//       background-repeat:no-repeat;
//       max-width:400px;
//     }
//     #background-content {
//       background-repeat:no-repeat;
//       background-size:contain;
//       height:100px;
//       display:flex;
//       align-items:center;
//       justify-content:center;
//     }
//   </style>
//   <div id="container">
//     <div id="background-content"></div>
//   </div>
// `;

// class OuterbasePluginConfig_$PLUGIN_ID {
//   constructor(object) {}
// }

// class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
//   static get observedAttributes() {
//     return privileges;
//   }

//   config = new OuterbasePluginConfig_$PLUGIN_ID({});

//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
//   }

//   connectedCallback() {
//     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
//       JSON.parse(this.getAttribute("configuration"))
//     );
//     var cellValue = this.getAttribute("cellvalue");
//     this.shadow.querySelector("#content-value").value = cellValue;
//     var contentInput = this.shadow.getElementById("content-value");
//     var viewContentButton = this.shadow.getElementById("view-content");

//     if (contentInput && viewContentButton) {
//       contentInput.addEventListener("focus", () => {
//         console.log("onstopedit 1");
//         this.callCustomEvent({
//           action: "onstopedit",
//           value: true,
//         });
//       });

//       contentInput.addEventListener("blur", () => {
//         this.callCustomEvent({
//           action: "cellvalue",
//           value: contentInput.value,
//         });
//         this.callCustomEvent({
//           action: "onstopedit",
//           value: true,
//         });
//       });
//       viewContentButton.addEventListener("click", () => {
//         var cellValue = contentInput.value;
//         fetch('https://api.openai.com/v1/chat/completions', {
//           method: 'POST',
//           headers: {
//             'Authorization': 'Bearer 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',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//               {
//                 text: cellValue,
//                 content: "user",
//               },
//             ],
//           }),
//         })
//         .then(response => response.json())
//         .then(data => {
//           var summary = data.choices[0].text.trim();
//           contentInput.value = summary;
//           this.callCustomEvent({
//             action: "onedit",
//             value: true,
//           });
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//       });

//         var message = "Summary generated";
//         contentInput.value = message;
//         this.callCustomEvent({
//           action: "onedit",
//           value: true,
//         });
//       });
//     }
//   }

//   callCustomEvent(data) {
//     const event = new CustomEvent("custom-change", {
//       detail: data,
//       bubbles: true,
//       composed: true,
//     });

//     this.dispatchEvent(event);
//   }
// }

// class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
//   static get observedAttributes() {
//     return privileges;
//   }

//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
//     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
//       JSON.parse(this.getAttribute("configuration"))
//     );
//   }

//   connectedCallback() {
//     var cellValue = this.getAttribute("cellvalue");
//     var message = "Summary generated";
//     var backgroundContentView =
//       this.shadow.getElementById("background-content");
//     if (backgroundContentView) {
//       backgroundContentView.innerHTML = message;
//     }
//     backgroundContentView.style.backgroundColor = "blue";
//     backgroundContentView.style.color = "white";
//   }
// }

// window.customElements.define(
//   "outerbase-plugin-cell-$PLUGIN_ID",
//   OuterbasePluginCell_$PLUGIN_ID
// );
// window.customElements.define(
//   "outerbase-plugin-editor-$PLUGIN_ID",
//   OuterbasePluginEditor_$PLUGIN_ID
// );
// //cohere not working everything disseaper
// // var privileges = ["cellValue", "configuration"];

// // var templateCell_$PLUGIN_ID = document.createElement("template");
// // templateCell_$PLUGIN_ID.innerHTML = `
// //   <style>
// //     #container {
// //       display: flex;
// //       align-items: center;
// //       gap: 8px;
// //       justify-content: space-between;
// //       height: 100%;
// //       width: calc(100% - 16px);
// //       padding: 0 8px;
// //     }
// //     input {
// //       height: 100%;
// //       flex: 1;
// //       background-color: transparent;
// //       border: 0;
// //       min-width: 0;
// //       white-space: nowrap;
// //       text-overflow: ellipsis;
// //       overflow: hidden;
// //     }
// //     input:focus {
// //       outline: none;
// //     }
// //   </style>
// //   <div id="container">
// //     <input type="text" id="content-value" placeholder="Enter URL...">
// //     <button id="view-content">Analyze</button>
// //   </div>
// // `;

// // var templateEditor_$PLUGIN_ID = document.createElement("template");
// // templateEditor_$PLUGIN_ID.innerHTML = `
// //   <style>
// //     #container {
// //       width: 150px;
// //       max-width:400px;
// //     }
// //     #content-old {
// //       width:100%;
// //       height:100%;
// //     }
// //     #content {
// //       background-size: contain;
// //       background-repeat:no-repeat;
// //       max-width:400px;
// //     }
// //     #background-content {
// //       background-repeat:no-repeat;
// //       background-size:contain;
// //       height:100px;
// //       display:flex;
// //       align-items:center;
// //       justify-content:center;
// //     }
// //   </style>
// //   <div id="container">
// //     <div id="background-content"></div>
// //   </div>
// // `;

// // class OuterbasePluginConfig_$PLUGIN_ID {
// //   constructor(object) {}
// // }

// // class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
// //   static get observedAttributes() {
// //     return privileges;
// //   }

// //   config = new OuterbasePluginConfig_$PLUGIN_ID({});

// //   constructor() {
// //     super();
// //     this.shadow = this.attachShadow({ mode: "open" });
// //     this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
// //   }

// //   connectedCallback() {
// //     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
// //       JSON.parse(this.getAttribute("configuration"))
// //     );
// //     var cellValue = this.getAttribute("cellvalue");
// //     this.shadow.querySelector("#content-value").value = cellValue;
// //     var contentInput = this.shadow.getElementById("content-value");
// //     var viewContentButton = this.shadow.getElementById("view-content");

// //     if (contentInput && viewContentButton) {
// //       contentInput.addEventListener("focus", () => {
// //         console.log("onstopedit 1");
// //         this.callCustomEvent({
// //           action: "onstopedit",
// //           value: true,
// //         });
// //       });

// //       contentInput.addEventListener("blur", () => {
// //         this.callCustomEvent({
// //           action: "cellvalue",
// //           value: contentInput.value,
// //         });
// //         this.callCustomEvent({
// //           action: "onstopedit",
// //           value: true,
// //         });
// //       });

// //       viewContentButton.addEventListener("click", () => {
// //         var cellValue = contentInput.value;
// //         fetch('https://api.cohere.ai/v1/summarize', {
// //           method: 'POST',
// //           headers: {
// //             'accept': 'application/json',
// //             'authorization': 'Bearer o6xcNryIUl8JZOYv16Csi7FIQoBMxQxDMermbJ75',
// //             'content-type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             length: "medium",
// //             format: "paragraph",
// //             model: "command",
// //             extractiveness: "low",
// //             temperature: 0.3,
// //             text: cellValue,
// //           }),
// //         })
// //         .then(response => response.json())
// //         .then(data => {
// //           contentInput.value = data.summary;
// //           this.callCustomEvent({
// //             action: "onedit",
// //             value: true,
// //           });
// //         })
// //         .catch((error) => {
// //           console.error('Error:', error);
// //         });
// //       });
      

// //         var message = "Summary generated";
// //         contentInput.value = message;
// //         this.callCustomEvent({
// //           action: "onedit",
// //           value: true,
// //         });
// //       });
// //     }
// //   }

// //   callCustomEvent(data) {
// //     const event = new CustomEvent("custom-change", {
// //       detail: data,
// //       bubbles: true,
// //       composed: true,
// //     });

// //     this.dispatchEvent(event);
// //   }
// // }

// // class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
// //   static get observedAttributes() {
// //     return privileges;
// //   }

// //   constructor() {
// //     super();
// //     this.shadow = this.attachShadow({ mode: "open" });
// //     this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
// //     this.config = new OuterbasePluginConfig_$PLUGIN_ID(
// //       JSON.parse(this.getAttribute("configuration"))
// //     );
// //   }

// //   connectedCallback() {
// //     var cellValue = this.getAttribute("cellvalue");
// //     var message = "Summary generated";
// //     var backgroundContentView =
// //       this.shadow.getElementById("background-content");
// //     if (backgroundContentView) {
// //       backgroundContentView.innerHTML = message;
// //     }
// //     backgroundContentView.style.backgroundColor = "blue";
// //     backgroundContentView.style.color = "white";
// //   }
// // }

// // window.customElements.define(
// //   "outerbase-plugin-cell-$PLUGIN_ID",
// //   OuterbasePluginCell_$PLUGIN_ID
// // );
// // window.customElements.define(
// //   "outerbase-plugin-editor-$PLUGIN_ID",
// //   OuterbasePluginEditor_$PLUGIN_ID
// // );

var wordsToCheck = ["bad", "yak", "Shoot", "magical", "inner", "stories", "writing", "lyrical", "Murakami"];

var privileges = ["cellValue", "configuration"];

var templateCell_$PLUGIN_ID = document.createElement("template");
templateCell_$PLUGIN_ID.innerHTML = `
  <style>
    #container {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      height: 100%;
      width: calc(100% - 16px);
      padding: 0 8px;
    }
    input {
      height: 100%;
      flex: 1;
      background-color: transparent;
      border: 0;
      min-width: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    input:focus {
      outline: none;
    }
  </style>
  <div id="container">
    <input type="text" id="content-value" placeholder="Enter URL...">
    <button id="view-content">Analyze</button>
  </div>
`;

var templateEditor_$PLUGIN_ID = document.createElement('template')
templateEditor_$PLUGIN_ID.innerHTML = `
  <style>
    #container {
      width: 150px;
      max-width:400px;
    }
    #content-old {
      width:100%;
      height:100%;
    }
    #content {
      background-size: contain;
      background-repeat:no-repeat;
      max-width:400px;
    }
    #background-content {
      background-repeat:no-repeat;
      background-size:contain;
      height:100px;
      display:flex;
      align-items:center;
      justify-content:center;
    }
  </style>
  <div id="container">
    <div id="background-content"></div>
  </div>
`

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor(object) {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
  }

  connectedCallback() {
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
    var cellValue = this.getAttribute("cellvalue");
    this.shadow.querySelector("#content-value").value = cellValue;
    var contentInput = this.shadow.getElementById("content-value");
    var viewContentButton = this.shadow.getElementById("view-content");

    if (contentInput && viewContentButton) {
      contentInput.addEventListener("focus", () => {
        console.log("onstopedit 1");
        this.callCustomEvent({
          action: "onstopedit",
          value: true,
        });
      });

      contentInput.addEventListener("blur", () => {
        this.callCustomEvent({
          action: "cellvalue",
          value: contentInput.value,
        });
        this.callCustomEvent({
          action: "onstopedit",
          value: true,
        });
      });

      viewContentButton.addEventListener("click", () => {
        var containsWords = wordsToCheck.some((word) =>
          cellValue.includes(word)
        );
        var message = containsWords ? "contains words" : "no";
        contentInput.value = message;
        this.callCustomEvent({
          action: "onedit",
          value: true,
        });
      });
    }
  }

  callCustomEvent(data) {
    const event = new CustomEvent("custom-change", {
      detail: data,
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }
}

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
  }

  connectedCallback() {
    var cellValue = this.getAttribute("cellvalue");
    var foundWords = wordsToCheck.filter((word) => cellValue.includes(word));
    var message = foundWords.length > 0 ? "contains words: " + foundWords.join(", ") : "no";
    var backgroundContentView = this.shadow.getElementById("background-content");
    if (backgroundContentView) {
      backgroundContentView.innerHTML = message;
    }
    backgroundContentView.style.backgroundColor = 'blue';
    backgroundContentView.style.color = 'white';
  }
}

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);
window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);

connectedCallback() {
  var cellValue = this.getAttribute("cellvalue");
  var foundWords = wordsToCheck.filter((word) => cellValue.includes(word));
  var message = foundWords.length > 0 ? "contains words: " + foundWords.join(", ") : "no";
  var backgroundContentView = this.shadow.getElementById("background-content");
  if (backgroundContentView) {
    backgroundContentView.innerHTML = message;
  }
  backgroundContentView.style.backgroundColor = 'blue';
  backgroundContentView.style.color = 'white';
}
