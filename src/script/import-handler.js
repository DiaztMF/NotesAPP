// FILE UPLOAD & PROCESSING SYSTEM

class FileProcessor {
  constructor() {
    this.currentFile = null;
    this.setupPDFWorker();
    this.initializeEventListeners();
  }

  /**
   * SETUP PDF.JS WORKER
   * Configures the worker URL for PDF.js
   */
  setupPDFWorker() {
    if (typeof pdfjsLib !== "undefined") {
      // eslint-disable-next-line no-undef
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
    }
  }

  /**
   * INITIALIZE EVENT LISTENERS
   * Setup semua event handler untuk UI interaction
   */
  initializeEventListeners() {
    const fileInput = document.getElementById("file-input");
    const uploadArea = document.getElementById("upload-area");
    const selectBtn = document.querySelector(".select-file-btn");
    const processBtn = document.getElementById("process-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    // File selection events
    if (selectBtn) {
      selectBtn.addEventListener("click", () => fileInput.click());
    }

    uploadArea.addEventListener("click", (e) => {
      // Only trigger file input if not clicking the select button
      if (!e.target.classList.contains("select-file-btn")) {
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", (e) => this.handleFileSelect(e));

    // Drag and drop events
    uploadArea.addEventListener("dragover", (e) => this.handleDragOver(e));
    uploadArea.addEventListener("dragleave", (e) => this.handleDragLeave(e));
    uploadArea.addEventListener("drop", (e) => this.handleDrop(e));

    // Button events
    processBtn.addEventListener("click", () => this.processFile());
    cancelBtn.addEventListener("click", () => this.resetUpload());
  }

  /**
   * DRAG & DROP HANDLERS
   * Menangani interaksi drag and drop
   */
  handleDragOver(e) {
    e.preventDefault();
    const uploadArea = document.getElementById("upload-area");
    uploadArea.style.borderColor = "#5046FA";
    uploadArea.style.backgroundColor = "rgba(80, 70, 250, 0.1)";
  }

  handleDragLeave(e) {
    e.preventDefault();
    const uploadArea = document.getElementById("upload-area");
    uploadArea.style.borderColor = "";
    uploadArea.style.backgroundColor = "";
  }

  handleDrop(e) {
    e.preventDefault();
    const uploadArea = document.getElementById("upload-area");
    uploadArea.style.borderColor = "";
    uploadArea.style.backgroundColor = "";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.selectFile(files[0]);
    }
  }

  /**
   * FILE SELECTION HANDLER
   * Menangani pemilihan file dari input
   */
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectFile(file);
    }
  }

  /**
   * FILE SELECTION LOGIC
   * Validasi dan setup file yang dipilih
   */
  selectFile(file) {
    // Check file size (5MB limit)
    if (file.size > 5242880) {
      this.showStatus("File size exceeds 5MB limit", "error");
      return;
    }

    // Validate file format
    const validExtensions = [".docx", ".pdf", ".txt", ".json"];
    const fileName = file.name.toLowerCase();
    const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidFile) {
      this.showStatus(
        "Invalid file format. Please select DOCX, PDF, TXT, or JSON file",
        "error",
      );
      return;
    }

    this.currentFile = file;
    document.getElementById("process-btn").disabled = false;
    this.showStatus(
      `File selected: ${file.name} (${this.formatFileSize(file.size)})`,
      "success",
    );
  }

  /**
   * MAIN FILE PROCESSING FUNCTION
   * Router untuk memproses file berdasarkan tipenya
   */
  async processFile() {
    if (!this.currentFile) return;

    this.showStatus("Processing file...", "loading");
    document.getElementById("process-btn").disabled = true;

    try {
      let result;
      const fileName = this.currentFile.name.toLowerCase();

      // Route berdasarkan ekstensi file
      if (fileName.endsWith(".docx")) {
        result = await this.processDOCX(this.currentFile);
      } else if (fileName.endsWith(".pdf")) {
        result = await this.processPDF(this.currentFile);
      } else if (fileName.endsWith(".txt")) {
        result = await this.processTXT(this.currentFile);
      } else if (fileName.endsWith(".json")) {
        result = await this.processJSON(this.currentFile);
      } else {
        throw new Error("Unsupported file format");
      }

      this.displayResults(result);
      this.showStatus("File processed successfully!", "success");
    } catch (error) {
      console.error("File processing error:", error);
      this.showStatus(`Error processing file: ${error.message}`, "error");
    } finally {
      document.getElementById("process-btn").disabled = false;
    }
  }

  /**
   * DOCX FILE PROCESSOR
   * Menggunakan mammoth.js untuk ekstrak text dari DOCX
   */
  async processDOCX(file) {
    if (typeof mammoth === "undefined") {
      throw new Error("Mammoth.js library not loaded");
    }

    const arrayBuffer = await this.readFileAsArrayBuffer(file);
    const result = await mammoth.extractRawText({ arrayBuffer });

    if (result.messages.length > 0) {
      console.warn("DOCX processing warnings:", result.messages);
    }

    return this.extractTitleAndContent(result.value, file);
  }

  /**
   * PDF FILE PROCESSOR
   * Menggunakan PDF.js untuk ekstrak text dari PDF
   */
  async processPDF(file) {
    if (typeof pdfjsLib === "undefined") {
      throw new Error("PDF.js library not loaded");
    }

    const arrayBuffer = await this.readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Ekstrak text dari setiap halaman
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Gabungkan semua text items
      const pageText = textContent.items.map((item) => item.str).join(" ");

      fullText += pageText + "\n";
    }

    return this.extractTitleAndContent(fullText.trim(), file);
  }

  /**
   * TXT FILE PROCESSOR
   * Pembacaan langsung file text
   */
  async processTXT(file) {
    const text = await this.readFileAsText(file);
    return this.extractTitleAndContent(text, file);
  }

  /**
   * JSON FILE PROCESSOR
   * Parsing JSON dan ekstraksi field title/content
   */
  async processJSON(file) {
    const text = await this.readFileAsText(file);

    try {
      const jsonData = JSON.parse(text);

      let title = "";
      let content = "";

      // Cari field 'title' dan 'content' dalam berbagai level
      if (typeof jsonData === "object" && jsonData !== null) {
        // Cari di level root
        title = this.findFieldInObject(jsonData, [
          "title",
          "name",
          "heading",
          "header",
        ]);
        content = this.findFieldInObject(jsonData, [
          "content",
          "body",
          "text",
          "description",
          "data",
        ]);

        // Jika tidak ditemukan, coba ambil dari array pertama
        if (
          !title &&
          !content &&
          Array.isArray(jsonData) &&
          jsonData.length > 0
        ) {
          const firstItem = jsonData[0];
          if (typeof firstItem === "object" && firstItem !== null) {
            title = this.findFieldInObject(firstItem, [
              "title",
              "name",
              "heading",
              "header",
            ]);
            content = this.findFieldInObject(firstItem, [
              "content",
              "body",
              "text",
              "description",
            ]);
          }
        }

        // Fallback: gunakan key pertama sebagai title, sisanya sebagai content
        if (!title && !content) {
          const keys = Object.keys(jsonData);
          if (keys.length > 0) {
            title = keys[0];
            content =
              typeof jsonData[keys[0]] === "string"
                ? jsonData[keys[0]]
                : JSON.stringify(jsonData[keys[0]], null, 2);
          }
        }
      } else {
        // Jika JSON adalah primitive, gunakan sebagai content
        content =
          typeof jsonData === "string" ? jsonData : JSON.stringify(jsonData);
        title = "JSON Data";
      }

      return {
        title: title || "JSON Data",
        content: content || JSON.stringify(jsonData, null, 2),
        fileInfo: {
          name: file.name,
          size: file.size,
          type: "JSON",
          processed: new Date().toLocaleString(),
        },
      };
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}`);
    }
  }

  /**
   * JSON FIELD FINDER
   * Mencari field dalam object JSON dengan berbagai nama yang mungkin
   */
  findFieldInObject(obj, fieldNames) {
    if (!obj || typeof obj !== "object") return "";

    for (const fieldName of fieldNames) {
      // Case-insensitive search
      const key = Object.keys(obj).find(
        (k) => k.toLowerCase() === fieldName.toLowerCase(),
      );
      if (key && obj[key] !== null && obj[key] !== undefined) {
        return typeof obj[key] === "string"
          ? obj[key]
          : JSON.stringify(obj[key], null, 2);
      }
    }
    return "";
  }

  /**
   * TITLE & CONTENT EXTRACTOR
   * Mengekstrak title (baris pertama) dan content (sisa baris)
   */
  extractTitleAndContent(text, file) {
    if (!text || typeof text !== "string") {
      return {
        title: file.name.split(".")[0] || "Untitled Document",
        content: "No content found",
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.name.split(".").pop().toUpperCase(),
          processed: new Date().toLocaleString(),
        },
      };
    }

    const lines = text.split(/\r?\n/).map((line) => line.trim());

    // Cari baris pertama yang tidak kosong untuk title
    let title = "";
    let contentStartIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        title = lines[i];
        contentStartIndex = i + 1;
        break;
      }
    }

    // Ambil sisa baris sebagai content
    const contentLines = lines.slice(contentStartIndex).filter((line) => line);
    const content = contentLines.join("\n");

    // Jika tidak ada line breaks dan text panjang, potong title
    if (!title && text.length > 100) {
      const firstSentence = text.match(/^.{1,100}[.!?]\s*/);
      if (firstSentence) {
        title = firstSentence[0].trim();
        content = text.substring(firstSentence[0].length).trim();
      } else {
        title = text.substring(0, 100) + "...";
        content = text.substring(100).trim();
      }
    }

    return {
      title: title || file.name.split(".")[0] || "Untitled Document",
      content: content || text || "No content found",
      fileInfo: {
        name: file.name,
        size: file.size,
        type: file.name.split(".").pop().toUpperCase(),
        processed: new Date().toLocaleString(),
      },
    };
  }

  /**
   * FILE READERS
   * Utility functions untuk membaca file dalam format berbeda
   */
  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () =>
        reject(new Error("Failed to read file as ArrayBuffer"));
      reader.readAsArrayBuffer(file);
    });
  }

  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error("Failed to read file as text"));
      reader.readAsText(file, "UTF-8");
    });
  }

  /**
   * UI UPDATE FUNCTIONS
   * Functions untuk update tampilan UI
   */
  displayResults(result) {
    const container = document.getElementById("results-container");
    const titleElement = document.getElementById("noteTitle");
    const contentElement = document.getElementById("noteContent");

    // Update title dan content
    if (titleElement) {
      titleElement.value = result.title;
    }

    if (contentElement) {
      contentElement.value = result.content;
    }

    // Show results container
    if (container) {
      container.style.display = "block";
    }
  }

  showStatus(message, type) {
    const container = document.getElementById("status-container");
    const mainContainer = document.getElementById("main-status-container");

    if (!container || !mainContainer) return;

    // Clear previous messages
    container.innerHTML = "";

    if (message) {
      if (type === "loading") {
        mainContainer.innerHTML = "⏳ Processing...";
        container.innerHTML = message;
      } else if (type === "success") {
        mainContainer.innerHTML = "✅ Your file is ready";
        container.innerHTML = message;
      } else if (type === "error") {
        mainContainer.innerHTML = "❌ Unable to read your file";
        container.innerHTML = `<span style="color: #ef4444;">${message}</span>`;
      } else {
        container.innerHTML = message;
      }
    } else {
      // Reset to default state
      mainContainer.innerHTML = "Drag and drop your files";
      container.innerHTML = "DOCX, PDF, TXT, and JSON formats, up to 5MB";
    }
  }

  resetUpload() {
    this.currentFile = null;
    const fileInput = document.getElementById("file-input");
    const processBtn = document.getElementById("process-btn");
    const resultsContainer = document.getElementById("results-container");
    const titleElement = document.getElementById("noteTitle");
    const contentElement = document.getElementById("noteContent");

    if (fileInput) fileInput.value = "";
    if (processBtn) processBtn.disabled = true;
    if (resultsContainer) resultsContainer.style.display = "none";
    if (titleElement) titleElement.value = "";
    if (contentElement) contentElement.value = "";

    this.showStatus("", "reset");
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

/**
 * INITIALIZE APPLICATION
 * Menjalankan aplikasi setelah DOM ready
 */
document.addEventListener("DOMContentLoaded", function () {
  const processor = new FileProcessor();
  console.log("File Upload & Processing System initialized");
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = FileProcessor;
}
