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
          fetch("https://middle-indigo.cmd.outerbase.io/changeSrcWithPlugin", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: id.toString(),
              src: secureUrl,
            }),
          });
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

//test-value-dymanic//wrong
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
  constructor(object) {
    this.cloudName = object.cloudName || "";
    this.uploadPreset = object.uploadPreset || "";
  }
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

    // Use the cloudName and uploadPreset from the config object
    var cloudName = this.config.cloudName;
    var uploadPreset = this.config.uploadPreset;

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
          fetch("https://middle-indigo.cmd.outerbase.io/changeSrcWithPlugin", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: id.toString(),
              src: secureUrl,
            }),
          });
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

var templateEditor_$PLUGIN_ID = document.createElement("template");
templateEditor_$PLUGIN_ID.innerHTML = `
<style>
#container {
max-height: 120px;
overflow-y: scroll;
}
</style>
<div id="container">
</div>
`;

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return ["cellValue", "configuration"];
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
  }

  connectedCallback() {
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
    this.render();
  }

  render() {
    const container = this.shadow.querySelector("#container");

    // Create input fields for cloudName and uploadPreset
    const cloudNameInput = document.createElement("input");
    cloudNameInput.type = "text";
    cloudNameInput.placeholder = "Enter your Cloudinary cloud name";

    const uploadPresetInput = document.createElement("input");
    uploadPresetInput.type = "text";
    uploadPresetInput.placeholder = "Enter your Cloudinary upload preset";

    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      // Save the entered cloudName and uploadPreset to the config object
      this.config.cloudName = cloudNameInput.value;
      this.config.uploadPreset = uploadPresetInput.value;

      // Update the configuration attribute with the new config object
      this.setAttribute("configuration", JSON.stringify(this.config));

      // You can now use this.config.cloudName and this.config.uploadPreset in your Cloudinary API calls
    });

    // Append the input fields and save button to the container
    container.appendChild(cloudNameInput);
    container.appendChild(uploadPresetInput);
    container.appendChild(saveButton);
  }
}

window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);

////////////////////////////////////////////////
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
  constructor(object) {
    this.cloudName = object.cloudName || "";
    this.uploadPreset = object.uploadPreset || "";
  }
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
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "configuration") {
      this.config = new OuterbasePluginConfig_$PLUGIN_ID(JSON.parse(newValue));
    }
  }
  uploadToCloudinary(file) {
    // Store the old URL before uploading to Cloudinary
    const oldUrl = this.getAttribute("cellValue");
    console.log(this.config, "CONFIG");
    // Use the cloudName and uploadPreset from the config object
    var cloudName = this.config.cloudName;
    var uploadPreset = this.config.uploadPreset;

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
          fetch("https://middle-indigo.cmd.outerbase.io/changeSrcWithPlugin", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: id.toString(),
              src: secureUrl,
            }),
          });
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

var templateEditor_$PLUGIN_ID = document.createElement("template");
templateEditor_$PLUGIN_ID.innerHTML = `
<style>
#container {
max-height: 120px;
overflow-y: scroll;
}
</style>
<div id="container">
</div>
`;

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return ["cellValue", "configuration"];
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));
  }

  connectedCallback() {
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
    this.render();
  }

  render() {
    const container = this.shadow.querySelector("#container");

    // Create input fields for cloudName and uploadPreset
    const cloudNameInput = document.createElement("input");
    cloudNameInput.type = "text";
    cloudNameInput.placeholder = "Enter your Cloudinary cloud name";

    const uploadPresetInput = document.createElement("input");
    uploadPresetInput.type = "text";
    uploadPresetInput.placeholder = "Enter your Cloudinary upload preset";

    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      // Save the entered cloudName and uploadPreset to the config object
      console.log(cloudNameInput.value, uploadPresetInput.value, "cloudName");
      this.config.cloudName = cloudNameInput.value;
      this.config.uploadPreset = uploadPresetInput.value;

      // Update the configuration attribute with the new config object
      this.setAttribute("configuration", JSON.stringify(this.config));

      // You can now use this.config.cloudName and this.config.uploadPreset in your Cloudinary API calls
    });

    // Append the input fields and save button to the container
    container.appendChild(cloudNameInput);
    container.appendChild(uploadPresetInput);
    container.appendChild(saveButton);
  }
}

window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);

var templateConfiguration_$PLUGIN_ID = document.createElement("template");
templateConfiguration_$PLUGIN_ID.innerHTML = `
<style>
#container {
display: flex;
height: 100%;
overflow-y: scroll;
padding: 40px 50px 65px 40px;
}
</style>
<div id="container">
</div>
`;

class OuterbasePluginConfiguration_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});
  items = [];

  constructor() {
    super();

    // The shadow DOM is a separate DOM tree that is attached to the element.
    // This allows us to encapsulate our styles and markup. It also prevents
    // styles from the parent page from leaking into our plugin.
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(
      templateConfiguration_$PLUGIN_ID.content.cloneNode(true)
    );
  }

  connectedCallback() {
    // Parse the configuration object from the `configuration` attribute
    // and store it in the `config` property.
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );

    // Set the items property to the value of the `tableValue` attribute.
    if (this.getAttribute("tableValue")) {
      this.items = JSON.parse(this.getAttribute("tableValue"));
    }

    // Manually render dynamic content
    this.render();
  }

  render() {
    let sample = this.items.length ? this.items[0] : {};
    let keys = Object.keys(sample);

    // Create input fields for cloudName and uploadPreset
    const cloudNameInput = document.createElement("input");
    cloudNameInput.type = "text";
    cloudNameInput.placeholder = "Enter your Cloudinary cloud name";

    const uploadPresetInput = document.createElement("input");
    uploadPresetInput.type = "text";
    uploadPresetInput.placeholder = "Enter your Cloudinary upload preset";

    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      // Save the entered cloudName and uploadPreset to the config object
      this.config.cloudName = cloudNameInput.value;
      this.config.uploadPreset = uploadPresetInput.value;

      // Update the configuration attribute with the new config object
      this.setAttribute("configuration", JSON.stringify(this.config));

      // You can now use this.config.cloudName and this.config.uploadPreset in your Cloudinary API calls
      this.callCustomEvent({
        action: "onsave",
        value: {},
      });
    });

    const container = this.shadow.querySelector("#container");

    // Append the input fields and save button to the container
    container.appendChild(cloudNameInput);
    container.appendChild(uploadPresetInput);
    container.appendChild(saveButton);
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
  "outerbase-plugin-configuration-$PLUGIN_ID",
  OuterbasePluginConfiguration_$PLUGIN_ID
);


// Updated code for dynamic cloudinary

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
  constructor(object) {
    this.cloudName = object.cloudName || "";
    this.uploadPreset = object.uploadPreset || "";
  }
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
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "configuration") {
      this.config = new OuterbasePluginConfig_$PLUGIN_ID(JSON.parse(newValue));
    }
  }
  uploadToCloudinary(file) {
    // Store the old URL before uploading to Cloudinary
    const oldUrl = this.getAttribute("cellValue");
    console.log(this.config, "CONFIG");
    // Use the cloudName and uploadPreset from the config object
    var cloudName = this.config.cloudName;
    var uploadPreset = this.config.uploadPreset;

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
          fetch("https://middle-indigo.cmd.outerbase.io/changeSrcWithPlugin", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: id.toString(),
              src: secureUrl,
            }),
          });
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

class OuterbasePluginConfiguration_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});
  items = [];

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(
      templateConfiguration_$PLUGIN_ID.content.cloneNode(true)
    );
  }

  connectedCallback() {
    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
    console.log('Initial configuration:', this.config); // Log initial configuration

    if (this.getAttribute("tableValue")) {
      this.items = JSON.parse(this.getAttribute("tableValue"));
    }

    this.render();
  }

  render() {
    let sample = this.items.length ? this.items[0] : {};
    let keys = Object.keys(sample);

    const cloudNameInput = document.createElement("input");
    cloudNameInput.type = "text";
    cloudNameInput.placeholder = "Enter your Cloudinary cloud name";

    const uploadPresetInput = document.createElement("input");
    uploadPresetInput.type = "text";
    uploadPresetInput.placeholder = "Enter your Cloudinary upload preset";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      console.log('Cloud name input value:', cloudNameInput.value); // Log input values
      console.log('Upload preset input value:', uploadPresetInput.value);

      this.config.cloudName = cloudNameInput.value;
      this.config.uploadPreset = uploadPresetInput.value;

      console.log('Updated configuration:', this.config); // Log updated configuration

      this.setAttribute("configuration", JSON.stringify(this.config));

      this.callCustomEvent({
        action: "onsave",
        value: {},
      });
    });

    const container = this.shadow.querySelector("#container");

    container.appendChild(cloudNameInput);
    container.appendChild(uploadPresetInput);
    container.appendChild(saveButton);
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
  "outerbase-plugin-configuration-$PLUGIN_ID",
  OuterbasePluginConfiguration_$PLUGIN_ID
);
