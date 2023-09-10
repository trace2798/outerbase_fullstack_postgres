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
    <button id="add-content">Add</button>
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
    var contentInput = this.shadow.getElementById("content-value");
    var addButton = this.shadow.getElementById("add-content");

    if (contentInput && addButton) {
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

      addButton.addEventListener("click", () => {
        // Replace these values with your own Cloudinary credentials
        var cloudName = "YOUR_CLOUD_NAME";
        var uploadPreset = "YOUR_UPLOAD_PRESET";

        // Create and open the Cloudinary upload widget
        var widget = cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              // Update the cell with the Cloudinary URL
              this.callCustomEvent({
                action: "cellvalue",
                value: result.info.secure_url,
              });
            }
          }
        );

        widget.open();
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

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);
window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);

addButton.addEventListener("click", () => {
  // Replace these values with your own Cloudinary credentials
  var cloudName = "dsbvkndi2";
  var apiKey = "574161482778227";
  var apiSecret = "ZwiQbjScXEpVpi0t9tWJAu_PIok";

  // Create a new FormData object to hold the file to upload
  var formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

  // Call the Cloudinary API to upload the file
  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    },
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
});


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
