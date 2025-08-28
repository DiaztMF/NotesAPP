// Integrated Export system
class ExportFile {
  constructor() {
    this.exportContainer = document.getElementById("export-container");
    this.notes = this.loadNotesFromStorage();
    this.init();
  }

  init() {
    if (this.exportContainer) {
      this.renderExportNotes();
      this.setupExportEventListeners();
    }
  }

  // Load notes from localStorage - compatible with both storage keys
  loadNotesFromStorage() {
    try {
      // Check for new format first (notesApp_notes)
      let savedNotes = localStorage.getItem("notesApp_notes");
      if (savedNotes) {
        return JSON.parse(savedNotes);
      }

      // Fallback to old format (notes) and migrate
      savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        const oldNotes = JSON.parse(savedNotes);
        const migratedNotes = this.migrateOldNotesToNewFormat(oldNotes);
        this.saveNotesToStorage(migratedNotes);
        return migratedNotes;
      }

      return [];
    } catch (error) {
      console.error("Error loading notes from storage:", error);
      return [];
    }
  }

  // Save notes to localStorage - save to both formats for backward compatibility
  saveNotesToStorage(notesToSave = null) {
    try {
      const notes = notesToSave || this.notes;

      // Save in new format
      localStorage.setItem("notesApp_notes", JSON.stringify(notes));

      // Also save in old format for backward compatibility
      const oldFormatNotes = notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        isArchived: note.isArchived,
        isFavorited: note.isStarred,
        isDeleted: false,
      }));
      localStorage.setItem("notes", JSON.stringify(oldFormatNotes));
    } catch (error) {
      console.error("Error saving notes to storage:", error);
    }
  }

  formatDate(date) {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleString("en-gb", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  }

  // Create note card HTML
  createNoteCard(note) {
    return `
                <div class="note-card" data-note-id="${note.id}">
                <div class="note-item">
                    <div class="note-header">
                        <div class="note-title" contenteditable="true" data-field="title">${
                          note.title
                        }</div>
                        <svg class="star-icon ${
                          note.isStarred ? "active" : ""
                        }" width="25" height="25" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" data-action="star">
                            <path d="M18.2479 3.63391C18.3173 3.49372 18.4245 3.37572 18.5574 3.29321C18.6903 3.21071 18.8436 3.16699 19 3.16699C19.1564 3.16699 19.3097 3.21071 19.4426 3.29321C19.5755 3.37572 19.6827 3.49372 19.7521 3.63391L23.4096 11.0423C23.6505 11.5299 24.0062 11.9518 24.4461 12.2717C24.8859 12.5916 25.3969 12.8 25.935 12.879L34.1145 14.076C34.2695 14.0984 34.4151 14.1638 34.5349 14.2647C34.6546 14.3656 34.7438 14.498 34.7922 14.647C34.8406 14.7959 34.8464 14.9554 34.8089 15.1074C34.7714 15.2595 34.6921 15.398 34.58 15.5073L28.6647 21.2675C28.2746 21.6477 27.9827 22.1169 27.8142 22.6349C27.6456 23.1529 27.6055 23.7041 27.6973 24.241L29.0938 32.3793C29.1211 32.5342 29.1044 32.6937 29.0455 32.8396C28.9865 32.9854 28.8878 33.1118 28.7605 33.2042C28.6333 33.2967 28.4826 33.3515 28.3256 33.3624C28.1687 33.3733 28.0119 33.3399 27.873 33.266L20.5612 29.4217C20.0794 29.1687 19.5434 29.0365 18.9992 29.0365C18.4551 29.0365 17.919 29.1687 17.4373 29.4217L10.127 33.266C9.98819 33.3395 9.83155 33.3725 9.67488 33.3614C9.51822 33.3503 9.36782 33.2954 9.2408 33.203C9.11378 33.1106 9.01524 32.9845 8.95637 32.8388C8.89751 32.6932 8.88069 32.534 8.90783 32.3793L10.3028 24.2426C10.3949 23.7054 10.355 23.1539 10.1864 22.6356C10.0179 22.1173 9.7258 21.6477 9.33533 21.2675L3.42 15.5089C3.30694 15.3997 3.22682 15.261 3.18878 15.1084C3.15073 14.9559 3.15628 14.7958 3.20479 14.6463C3.25331 14.4968 3.34284 14.3639 3.46319 14.2628C3.58354 14.1617 3.72987 14.0964 3.8855 14.0744L12.0634 12.879C12.6022 12.8006 13.1138 12.5925 13.5543 12.2726C13.9947 11.9526 14.3509 11.5304 14.592 11.0423L18.2479 3.63391Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    
                    <div class="note-content" contenteditable="true" data-field="content">${
                      note.content
                    }</div>
                    
                    <div class="note-meta">
                        ${this.formatDate(note.updatedAt)}
                    </div>
                    
                    <div class="note-actions">
                        <button class="action-btn" data-action="view">
                            <svg width="17" height="17" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.56199 12.3479C2.47865 12.1234 2.47865 11.8764 2.56199 11.6519C3.37369 9.68373 4.7515 8.00091 6.52076 6.81677C8.29001 5.63263 10.371 5.00049 12.5 5.00049C14.6289 5.00049 16.71 5.63263 18.4792 6.81677C20.2485 8.00091 21.6263 9.68373 22.438 11.6519C22.5213 11.8764 22.5213 12.1234 22.438 12.3479C21.6263 14.316 20.2485 15.9988 18.4792 17.183C16.71 18.3671 14.6289 18.9993 12.5 18.9993C10.371 18.9993 8.29001 18.3671 6.52076 17.183C4.7515 15.9988 3.37369 14.316 2.56199 12.3479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">View</p>
                        </button>
                        
                        <button class="action-btn" data-action="edit">
                            <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4166 4.875L14.3044 2.76275C13.9763 2.43454 13.5312 2.2501 13.0671 2.25H5.91663C5.4525 2.25 5.00738 2.43437 4.67919 2.76256C4.351 3.09075 4.16663 3.53587 4.16663 4V18C4.16663 18.4641 4.351 18.9092 4.67919 19.2374C5.00738 19.5656 5.4525 19.75 5.91663 19.75H16.4166C16.8808 19.75 17.3259 19.5656 17.6541 19.2374C17.9823 18.9092 18.1666 18.4641 18.1666 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.3724 11.5479C19.7209 11.1993 19.9167 10.7266 19.9167 10.2336C19.9167 9.74069 19.7209 9.26794 19.3724 8.91938C19.0238 8.57082 18.551 8.375 18.0581 8.375C17.5652 8.375 17.0924 8.57082 16.7439 8.91938L13.2351 12.4299C13.0271 12.6378 12.8748 12.8948 12.7924 13.1771L12.06 15.6884C12.038 15.7637 12.0367 15.8435 12.0562 15.9195C12.0756 15.9954 12.1152 16.0648 12.1706 16.1202C12.2261 16.1757 12.2954 16.2152 12.3714 16.2347C12.4474 16.2542 12.5272 16.2528 12.6025 16.2309L15.1137 15.4985C15.3961 15.4161 15.6531 15.2638 15.861 15.0558L19.3724 11.5479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.66663 16.25H8.54163" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">Edit</p>
                        </button>
                        
                        <button class="action-btn" data-action="download">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15V3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 10L12 15L17 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">Download</p>
                        </button>
                        
                    </div>
                </div>
                </div>
            `;
  }

  // Render all notes (for display page)
  renderExportNotes() {
    if (!this.exportContainer) return;

    const activeNotes = this.notes.filter(
      (note) => !note.isArchived && !note.isDeleted,
    );

    // Empty state
    if (activeNotes.length === 0) {
      this.exportContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; color: #888; padding: 40px; display: flex; justify-content: center; flex-direction: column">
                    <h3 style="margin-bottom: 0;">No notes yet</h3>
                    <p>Create your first note to get started!</p>
                    <button class="action-btn" onclick="window.location.href='write.html'" style="margin-top: 20px; background-color: #4CAF50;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Write New Note
                    </button>
                </div>
            `;
      return;
    }

    // Sort: starred first, then by updatedAt
    const sortedNotes = activeNotes.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    this.exportContainer.innerHTML = sortedNotes
      .map((note) => this.createNoteCard(note))
      .join("");
  }

  setupExportEventListeners() {
    if (!this.exportContainer) return;

    // Handle clicks on the notes container
    this.exportContainer.addEventListener("click", (e) => {
      const noteCard = e.target.closest(".note-card");
      if (!noteCard) return;

      const noteId = noteCard.dataset.noteId;
      const action = e.target.closest("[data-action]")?.dataset.action;

      if (action) {
        e.preventDefault();
        this.handleAction(action, noteId);
      }
    });

    // Handle content editing
    this.exportContainer.addEventListener(
      "blur",
      (e) => {
        if (e.target.hasAttribute("contenteditable")) {
          const noteCard = e.target.closest(".note-card");
          if (noteCard) {
            const noteId = noteCard.dataset.noteId;
            const field = e.target.dataset.field;
            const value = e.target.innerHTML;

            if (value && field) {
              this.updateNote(noteId, { [field]: value });
            }
          }
        }
      },
      true,
    );

    // Handle Enter key in title (move to content)
    this.exportContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.dataset.field === "title") {
        e.preventDefault();
        const noteCard = e.target.closest(".note-card");
        const contentField = noteCard.querySelector('[data-field="content"]');
        contentField.focus();
      }
    });
  }

  // Update existing note
  updateNote(id, updates) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      this.notes[noteIndex] = {
        ...this.notes[noteIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.saveNotesToStorage();

      // Only re-render if we're on the display page
      if (this.notesContainer) {
        this.renderNotes();
      }
    }
  }

  // Toggle star status
  toggleStar(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.isStarred = !note.isStarred;
      note.updatedAt = new Date().toISOString();
      this.saveNotesToStorage();

      if (this.exportContainer) {
        this.renderExportNotes();
      }
    }
  }

  viewNote(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      this.showNoteModal(note);
    }
  }

  // Show note in a modal
  showNoteModal(note) {
    // Create modal HTML
    const modalHTML = `
                <div class="note-modal-overlay" onclick="this.remove()">
                    <div class="note-modal" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h2>${note.title}</h2>
                            <button class="modal-close" onclick="this.closest('.note-modal-overlay').remove()">×</button>
                        </div>
                        <div class="modal-content">
                            <p style="white-space: pre-wrap;">${
                              note.content
                            }</p>
                        </div>
                        <div class="modal-footer">
                            <small>Created: ${this.formatDate(
                              note.createdAt,
                            )}</small>
                            <small>Last Modified: ${this.formatDate(
                              note.updatedAt,
                            )}</small>
                        </div>
                    </div>
                </div>
            `;

    // Add modal to page
    const modalEl = document.createElement("div");
    modalEl.innerHTML = modalHTML;
    document.body.appendChild(modalEl.firstElementChild);

    // Add modal styles
    const style = document.createElement("style");
    style.textContent = `
                .note-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                .note-modal {
                    background: #2a2a2a;
                    border-radius: 12px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80%;
                    overflow-y: auto;
                    color: white;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #444;
                }
                .modal-header h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #444;
                    display: flex;
                    justify-content: space-between;
                    color: #888;
                    font-size: 14px;
                }
            `;
    document.head.appendChild(style);
  }

  // Focus edit mode on note
  editNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    if (noteCard) {
      const titleField = noteCard.querySelector('[data-field="title"]');
      titleField.focus();

      // Select all text in title for easy editing
      const range = document.createRange();
      range.selectNodeContents(titleField);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  toggleDownload(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      this.showChoiceModal(note);
    }
  }

  // Show choice in a modal
  showChoiceModal(note) {
    // Create modal HTML
    const modalHTML = `
                <div class="note-modal-overlay" onclick="this.remove()">
                    <div class="note-modal" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h2>Choose File Format</h2>
                            <button class="modal-close" onclick="this.closest('.note-modal-overlay').remove()">×</button>
                        </div>
                        <div class="modal-content">
                          <div class="note-actions">
                            <button id="doc" class="action-btn" data-action="docx">
                                <p style="margin: 0; margin-left: 4px;">DOC</p>
                            </button>
                            
                            <button id="pdf" class="action-btn" data-action="pdf">
                                <p style="margin: 0; margin-left: 4px;">PDF</p>
                            </button>
                            
                            <button id="json" class="action-btn" data-action="json">
                                <p style="margin: 0; margin-left: 4px;">JSON</p>
                            </button>
                            
                            <button id="txt" class="action-btn" data-action="txt">
                                <p style="margin: 0; margin-left: 4px;">TXT</p>
                            </button>
                          </div>
                    </div>
                </div>
            `;

    // Add modal to page
    const modalEl = document.createElement("div");
    modalEl.innerHTML = modalHTML;
    document.body.appendChild(modalEl.firstElementChild);

    ["doc", "pdf", "json", "txt"].forEach((fmt) => {
      const btn = document.getElementById(fmt);
      btn.addEventListener("click", () => {
        this.exportNoteAs(note, fmt);
        console.log(`[Modal] Export ${note.id} (${note.title}) as ${fmt}`);
        console.log("[Modal] Full note data:", note);
      });
    });

    // Add modal styles
    const style = document.createElement("style");
    style.textContent = `
                .note-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                .note-modal {
                    background: #2a2a2a;
                    border-radius: 12px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80%;
                    overflow-y: auto;
                    color: white;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #444;
                }
                .modal-header h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    padding: 4rem;
                    line-height: 1.6;
                }
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #444;
                    display: flex;
                    justify-content: space-between;
                    color: #888;
                    font-size: 14px;
                }
                h2 {
                    text-align: center;
                }
            `;
    document.head.appendChild(style);
  }

  formatDate(date) {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleString("en-gb", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  }

  exportNoteAs(note, format) {
    if (!note) {
      console.error("Export failed: note tidak ditemukan");
      return;
    }

    console.log(
      `[Export] Mulai export note ${note.id} (${note.title}) dalam format ${format}`,
    );

    let content = "";
    let mimeType = "text/plain";
    let fileExtension = format;

    switch (format) {
      case "txt":
        content = `Title: ${note.title}\nCreated: ${this.formatDate(note.createdAt)}\n\n${note.content}`;
        mimeType = "text/plain";
        break;

      case "json":
        content = JSON.stringify(note, null, 2);
        mimeType = "application/json";
        break;

      case "doc":
        content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office'
              xmlns:w='urn:schemas-microsoft-com:office:word'
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="utf-8"></head>
        <body>
            <h2>${note.title}</h2>
            <p><b>Created:</b> ${this.formatDate(note.createdAt)}</p>
            <p>${note.content}</p>
        </body>
        </html>`;
        mimeType = "application/msword";
        fileExtension = "doc";
        break;

      case "pdf":
        content = `Title: ${note.title}\nCreated: ${this.formatDate(note.createdAt)}\n\n${note.content}`;
        mimeType = "application/pdf";
        break;

      default:
        console.warn(`[Export] Format ${format} belum didukung`);
        return;
    }

    // Buat blob
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    // Buat link download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title || "note"}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    console.log(
      `[Export] Note ${note.id} berhasil didownload sebagai ${format}`,
    );
  }

  // Handle different actions
  handleAction(action, noteId) {
    switch (action) {
      case "star":
        this.toggleStar(noteId);
        break;
      case "view":
        this.viewNote(noteId);
        break;
      case "edit":
        this.editNote(noteId);
        break;
      case "download":
        this.toggleDownload(noteId);
        break;
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ExportFile();
});
