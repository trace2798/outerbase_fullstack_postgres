// Just displays yes or no
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

//Adding this part in the above code shows the word mentioned in it too
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

// Working cloudinary code
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
    <input type="text" id="content-value" placeholder="Drop an image here...">
  </div>
`;

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor(object) {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return ["cellValue", "configuration"];
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
    var cellValue = this.getAttribute("cellValue");
    this.shadow.querySelector("#content-value").value = cellValue;

    var container = this.shadow.getElementById("container");

    if (container) {
      container.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      container.addEventListener("drop", (event) => {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        this.uploadToCloudinary(file);
      });
    }
  }

  uploadToCloudinary(file) {
    // Replace these values with your own Cloudinary credentials
    var cloudName = "YOUR_CLOUD_NAME";
    var uploadPreset = "YOUR_UPLOAD_PRESET";

    // Create a new FormData object to hold the file to upload
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Call the Cloudinary API to upload the file
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the cell with the Cloudinary URL
        this.callCustomEvent({
          action: "cellvalue",
          value: data.secure_url,
        });
      });
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

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);

// Your editor view
class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  
   static get observedAttributes() {
     return ["cellValue", "configuration"];
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
     var cellValue = this.getAttribute("cellValue");
     this.shadow.querySelector("#content-value").value = cellValue;

     var container = this.shadow.getElementById("container");

     if (container) {
       container.addEventListener("dragover", (event) => {
         event.preventDefault();
       });

       container.addEventListener("drop", (event) => {
         event.preventDefault();
         var file = event.dataTransfer.files[0];
         this.uploadToCloudinary(file);
       });
     }
   }

   uploadToCloudinary(file) {
     // Replace these values with your own Cloudinary credentials
     var cloudName = "zb8bzdvq";
     var uploadPreset = "zb8bzdvq";

     // Create a new FormData object to hold the file to upload
     var formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", uploadPreset);

     // Call the Cloudinary API to upload the file
     fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
       method: "POST",
       body: formData,
     })
       .then((response) => response.json())
       .then((data) => {
         // Update the cell with the Cloudinary URL
         this.callCustomEvent({
           action: "cellvalue",
           value: data.secure_url,
         });
       });
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

window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);























/////////////////////////////////
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
    <input type="text" id="content-value" placeholder="Drop an image here...">
  </div>
`;

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor(object) {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return ["cellValue", "configuration"];
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
    var cellValue = this.getAttribute("cellValue");
    this.shadow.querySelector("#content-value").value = cellValue;

    var container = this.shadow.getElementById("container");

    if (container) {
      container.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      container.addEventListener("drop", (event) => {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        this.uploadToCloudinary(file);
      });
    }
  }

  uploadToCloudinary(file) {
    // Replace these values with your own Cloudinary credentials
    var cloudName = "dsbvkndi2";
    var uploadPreset = "zb8bzdvq";

    // Create a new FormData object to hold the file to upload
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Call the Cloudinary API to upload the file
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the cell with the Cloudinary URL
        this.callCustomEvent({
          action: "cellvalue",
          value: data.secure_url,
        });
      });
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

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);

// Your editor view
class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  
   static get observedAttributes() {
     return ["cellValue", "configuration"];
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
     var cellValue = this.getAttribute("cellValue");
     this.shadow.querySelector("#content-value").value = cellValue;

     var container = this.shadow.getElementById("container");

     if (container) {
       container.addEventListener("dragover", (event) => {
         event.preventDefault();
       });

       container.addEventListener("drop", (event) => {
         event.preventDefault();
         var file = event.dataTransfer.files[0];
         this.uploadToCloudinary(file);
       });
     }
   }

   uploadToCloudinary(file) {
     // Replace these values with your own Cloudinary credentials
     var cloudName = "YOUR_CLOUD_NAME";
     var uploadPreset = "YOUR_UPLOAD_PRESET";

     // Create a new FormData object to hold the file to upload
     var formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", uploadPreset);

     // Call the Cloudinary API to upload the file
     fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
       method: "POST",
       body: formData,
     })
       .then((response) => response.json())
       .then((data) => {
         // Update the cell with the Cloudinary URL
         this.callCustomEvent({
           action: "cellvalue",
           value: data.secure_url,
         });
       });
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

window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);


//upload cloudinary and fetch to database
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
    <input type="text" id="content-value" placeholder="Drop an image here...">
  </div>
`;

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor(object) {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return ["cellValue", "configuration"];
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
    var cellValue = this.getAttribute("cellValue");
    this.shadow.querySelector("#content-value").value = cellValue;

    var container = this.shadow.getElementById("container");

    if (container) {
      container.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      container.addEventListener("drop", (event) => {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        this.uploadToCloudinary(file);
      });
    }
  }

  uploadToCloudinary(file) {
    // Store the old URL before uploading to Cloudinary
    const oldUrl = this.getAttribute("cellValue");

    // Replace these values with your own Cloudinary credentials
    var cloudName = "dsbvkndi2";
    var uploadPreset = "zb8bzdvq";

    // Create a new FormData object to hold the file to upload
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    let secureUrl;

    // Call the Cloudinary API to upload the file
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the cell with the Cloudinary URL
        this.callCustomEvent({
          action: "cellvalue",
          value: data.secure_url,
        });

        // Assign the secure_url to secureUrl
        secureUrl = data.secure_url;

        // Fetch the id using the old URL
        return fetch(
          `https://middle-indigo.cmd.outerbase.io/getnfoBySrc?src=${oldUrl}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.response.items.length > 0) {
          const id = data.response.items[0].id;
          console.log(id, "plugin fetch");
          console.log(secureUrl, "SECURE URL"); // Now this should log the secure_url

          // Send a PATCH request to change the src with the plugin
          fetch(
            "https://middle-indigo.cmd.outerbase.io/changeSrcWithPlugin",
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                id: id.toString(),
                src: secureUrl,
              }),
            }
          );
        }
      });
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

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);


