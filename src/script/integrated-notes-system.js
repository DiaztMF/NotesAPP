// Integrated NotesApp System - Compatible with both Write and Display pages
class NotesApp {
  constructor() {
    this.notesContainer = document.getElementById("notes-container");
    this.archivedNotesContainer = document.getElementById("archived-notes");
    this.favoritesNotesContainer = document.getElementById("favorites-notes");
    this.trashNotesContainer = document.getElementById("trash-notes");
    this.writeForm = document.getElementById("noteForm");
    this.notes = this.loadNotesFromStorage();
    this.init();
  }

  init() {
    // Initialize based on current page
    if (this.notesContainer) {
      // Notes display page
      this.renderNotes();
      this.setupDisplayEventListeners();
    }

    if (this.archivedNotesContainer) {
      this.renderArchivedNotes();
      this.setupArchivedEventListeners();
    }

    if (this.favoritesNotesContainer) {
      this.renderFavoritesNotes();
      this.setupFavoritesEventListeners();
    }

    if (this.trashNotesContainer) {
      this.renderDeletedNotes();
      this.setupDeletedEventListeners();
    }

    if (this.writeForm) {
      this.setupWriteEventListeners();
    }

    // Common event listeners
    this.setupCommonEventListeners();
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

  // Migrate old notes format to new format
  migrateOldNotesToNewFormat(oldNotes) {
    return oldNotes
      .map((note) => ({
        id:
          note.id?.toString() ||
          Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: note.title || "Untitled",
        content: note.content || "",
        createdAt: note.createdAt
          ? new Date(note.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: note.createdAt
          ? new Date(note.createdAt).toISOString()
          : new Date().toISOString(),
        isStarred: note.isFavorited || false,
        isArchived: note.isArchived || false,
        isDeleted: note.isDeleted || false,
      }))
      .filter((note) => !note.isDeleted); // Remove deleted notes during migration
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

  // Generate unique ID for new notes
  generateId() {
    return `notes-${Date.now()}`;
  }

  // Format date for display - compatible with both formats
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

  // Create a new note - unified method for both pages
  createNote(
    title = "New Note",
    content = "Start writing...",
    fromWritePage = false,
  ) {
    const now = new Date().toISOString();
    const newNote = {
      id: this.generateId(),
      title: title,
      content: content,
      createdAt: now,
      updatedAt: now,
      isStarred: false,
      isArchived: false,
      isDeleted: false,
    };

    this.notes.unshift(newNote);
    this.saveNotesToStorage();

    // Only re-render if we're on the display page
    if (this.notesContainer && !fromWritePage) {
      this.renderNotes();
    }

    return newNote;
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

  softDelete(id) {
    if (confirm("Move this note to trash?")) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        note.isDeleted = true;
        this.saveNotesToStorage();
        this.renderNotes();
        this.renderArchivedNotes();
        if (this.trashNotesContainer) {
          this.renderDeletedNotes();
        }
      }
    }
  }

  restoreNote(noteId) {
    const note = this.notes.find((n) => n.id == noteId && n.isDeleted);
    if (note) {
      note.isDeleted = false;
      note.updatedAt = new Date().toISOString();
      this.saveNotesToStorage();
      this.renderNotes();
      this.renderDeletedNotes();
    }
  }

  // Delete note
  hardDelete(id) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.notes = this.notes.filter((note) => note.id !== id);
      this.saveNotesToStorage();
      this.renderNotes();
      if (this.trashNotesContainer) {
        this.renderDeletedNotes();
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

      if (this.notesContainer) {
        this.renderNotes();
      }

      if (this.archivedNotesContainer) {
        this.renderNotes();
      }

      if (this.favoritesNotesContainer) {
        this.renderFavoritesNotes();
      }
    }
  }

  // Toggle archive status
  toggleArchive(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.isArchived = !note.isArchived;
      note.updatedAt = new Date().toISOString();
      this.saveNotesToStorage();

      if (this.notesContainer) {
        this.renderNotes();
      }

      if (this.archivedNotesContainer) {
        this.renderArchivedNotes();
      }
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
                        
                        <button class="action-btn" data-action="archive">
                            <svg width="15" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8333 12V11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.8333 18V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.8333 7V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.8333 2V6C14.8333 6.53043 15.044 7.03914 15.4191 7.41421C15.7942 7.78929 16.3029 8 16.8333 8H20.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.3333 22H18.8333C19.3637 22 19.8725 21.7893 20.2475 21.4142C20.6226 21.0391 20.8333 20.5304 20.8333 20V7L15.8333 2H6.83331C6.30288 2 5.79417 2.21071 5.4191 2.58579C5.04403 2.96086 4.83331 3.46957 4.83331 4V20C4.83339 20.355 4.92796 20.7036 5.10731 21.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.8333 22C11.9379 22 12.8333 21.1046 12.8333 20C12.8333 18.8954 11.9379 18 10.8333 18C9.72874 18 8.83331 18.8954 8.83331 20C8.83331 21.1046 9.72874 22 10.8333 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">${
                              note.isArchived ? "Unarchive" : "Archive"
                            }</p>
                        </button>
                        
                        <button class="action-btn" data-action="soft-delete">
                            <svg width="15" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.5 6H21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">Delete</p>
                        </button>
                    </div>
                </div>
                </div>
            `;
  }

  // Create note card HTML
  createDeletedNoteCard(note) {
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
                    
                    <div class="note-deleted-actions">
                        <button class="action-btn" data-action="view">
                            <svg width="17" height="17" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.56199 12.3479C2.47865 12.1234 2.47865 11.8764 2.56199 11.6519C3.37369 9.68373 4.7515 8.00091 6.52076 6.81677C8.29001 5.63263 10.371 5.00049 12.5 5.00049C14.6289 5.00049 16.71 5.63263 18.4792 6.81677C20.2485 8.00091 21.6263 9.68373 22.438 11.6519C22.5213 11.8764 22.5213 12.1234 22.438 12.3479C21.6263 14.316 20.2485 15.9988 18.4792 17.183C16.71 18.3671 14.6289 18.9993 12.5 18.9993C10.371 18.9993 8.29001 18.3671 6.52076 17.183C4.7515 15.9988 3.37369 14.316 2.56199 12.3479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">View</p>
                        </button>
                        
                        <button class="action-btn" data-action="restore">
                            <svg width="15" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 3H3.5C2.94772 3 2.5 3.44772 2.5 4V7C2.5 7.55228 2.94772 8 3.5 8H21.5C22.0523 8 22.5 7.55228 22.5 7V4C22.5 3.44772 22.0523 3 21.5 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.5 8V19C4.5 19.5304 4.71071 20.0391 5.08579 20.4142C5.46086 20.7893 5.96957 21 6.5 21H8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.5 8V19C20.5 19.5304 20.2893 20.0391 19.9142 20.4142C19.5391 20.7893 19.0304 21 18.5 21H16.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 15L12.5 12L15.5 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.5 12V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">Restore</p>
                        </button>
                        
                        <button class="action-btn" data-action="hard-delete">
                            <svg width="15" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.5 6H21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p style="margin: 0; margin-left: 4px;">Delete</p>
                        </button>
                    </div>
                </div>
                </div>
            `;
  }

  // Render all notes (for display page)
  renderNotes() {
    if (!this.notesContainer) return;

    const activeNotes = this.notes.filter(
      (note) => !note.isArchived && !note.isDeleted,
    );

    // Empty state
    if (activeNotes.length === 0) {
      this.notesContainer.innerHTML = `
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

    this.notesContainer.innerHTML = sortedNotes
      .map((note) => this.createNoteCard(note))
      .join("");
  }

  renderArchivedNotes() {
    if (!this.archivedNotesContainer) return;

    const archivedNotes = this.notes.filter(
      (note) => note.isArchived && !note.isDeleted,
    );

    // Empty state
    if (archivedNotes.length === 0) {
      this.archivedNotesContainer.innerHTML = `
            <div class="empty-state" style="text-align: center; color: #888; padding: 40px;">
                <h3>No archived notes</h3>
                <p>Your archived notes will appear here</p>
            </div>
        `;
      return;
    }

    this.archivedNotesContainer.innerHTML = archivedNotes
      .map((note) => this.createNoteCard(note))
      .join("");
  }

  renderFavoritesNotes() {
    if (!this.favoritesNotesContainer) return;

    const favoritesNotes = this.notes.filter(
      (note) => note.isStarred && !note.isDeleted,
    );

    // Empty state
    if (favoritesNotes.length === 0) {
      this.favoritesNotesContainer.innerHTML = `
            <div class="empty-state" style="text-align: center; color: #888; padding: 40px;">
                <h3>No favorites notes</h3>
                <p>Your favorites notes will appear here</p>
            </div>
        `;
      return;
    }

    this.favoritesNotesContainer.innerHTML = favoritesNotes
      .map((note) => this.createNoteCard(note))
      .join("");
  }

  renderDeletedNotes() {
    if (!this.trashNotesContainer) return;

    const deletedNotes = this.notes.filter((note) => note.isDeleted);

    // Empty state
    if (deletedNotes.length === 0) {
      this.trashNotesContainer.innerHTML = `
        <div class="empty-state" style="text-align: center; color: #888; padding: 40px;">
          <h3>No notes in trash</h3>
          <p>Deleted notes will appear here</p>
        </div>
      `;
      return;
    }

    // Sort by updatedAt (terbaru di atas)
    const sortedNotes = deletedNotes.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
    );

    this.trashNotesContainer.innerHTML = sortedNotes
      .map((note) => this.createDeletedNoteCard(note, { isTrash: true }))
      .join("");
  }

  // Setup event listeners for display page
  setupDisplayEventListeners() {
    if (!this.notesContainer) return;

    // Handle clicks on the notes container
    this.notesContainer.addEventListener("click", (e) => {
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
    this.notesContainer.addEventListener(
      "blur",
      (e) => {
        if (e.target.hasAttribute("contenteditable")) {
          const noteCard = e.target.closest(".note-card");
          if (noteCard) {
            const noteId = noteCard.dataset.noteId;
            const field = e.target.dataset.field;
            const value = e.target.innerHTML;
            this.updateNote(noteId, { [field]: value });

            if (value && field) {
              this.updateNote(noteId, { [field]: value });
            }
          }
        }
      },
      true,
    );

    // Handle Enter key in title (move to content)
    this.notesContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.dataset.field === "title") {
        e.preventDefault();
        const noteCard = e.target.closest(".note-card");
        const contentField = noteCard.querySelector('[data-field="content"]');
        contentField.focus();
      }
    });
  }

  setupArchivedEventListeners() {
    if (!this.archivedNotesContainer) return;

    this.archivedNotesContainer.addEventListener("click", (e) => {
      const noteCard = e.target.closest(".note-card");
      if (!noteCard) return;

      const noteId = noteCard.dataset.noteId;
      const action = e.target.closest("[data-action]")?.dataset.action;

      if (action) {
        e.preventDefault();
        this.handleAction(action, noteId);
      }
    });
  }

  setupFavoritesEventListeners() {
    if (!this.favoritesNotesContainer) return;

    this.favoritesNotesContainer.addEventListener("click", (e) => {
      const noteCard = e.target.closest(".note-card");
      if (!noteCard) return;

      const noteId = noteCard.dataset.noteId;
      const action = e.target.closest("[data-action]")?.dataset.action;

      if (action) {
        e.preventDefault();
        this.handleAction(action, noteId);
      }
    });
  }

  setupDeletedEventListeners() {
    if (!this.trashNotesContainer) return;

    this.trashNotesContainer.addEventListener("click", (e) => {
      const noteCard = e.target.closest(".note-card");
      if (!noteCard) return;

      const noteId = noteCard.dataset.noteId;
      const action = e.target.closest("[data-action]")?.dataset.action;

      if (action) {
        e.preventDefault();
        this.handleAction(action, noteId);
      }
    });
  }

  // Setup event listeners for write page
  setupWriteEventListeners() {
    if (!this.writeForm) return;

    // Handle form submission
    this.writeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = document.getElementById("noteTitle");
      const contentInput = document.getElementById("noteContent");

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      if (title && content) {
        // Create the note using the unified method
        this.createNote(title, content, true);

        // Show success message
        this.showSuccessMessage("Note added successfully!");

        // Reset form
        titleInput.value = "";
        contentInput.value = "";
        titleInput.focus();
      } else {
        this.showErrorMessage("Please fill in both title and content fields.");
      }
    });

    // Add input styling interactions (from your original code)
    const inputs = document.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#4a90e2";
        this.style.boxShadow = "0 0 0 2px rgba(74, 144, 226, 0.2)";
      });

      input.addEventListener("blur", function () {
        this.style.borderColor = "transparent";
        this.style.boxShadow = "none";
      });
    });

    // Auto-resize textarea
    const textarea = document.getElementById("noteContent");
    if (textarea) {
      textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    }

    // Keyboard shortcuts for write page
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        this.writeForm.dispatchEvent(new Event("submit"));
      }

      // Ctrl/Cmd + Enter to save and redirect
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        this.writeForm.dispatchEvent(new Event("submit"));
        setTimeout(() => {
          window.location.href = "notes.html";
        }, 1000);
      }
    });
  }

  // Setup common event listeners
  setupCommonEventListeners() {
    // Global keyboard shortcut for new note (Ctrl/Cmd + N)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "w") {
        e.preventDefault();
        window.location.href = "write.html";
      }
    });
  }

  // Show success message
  showSuccessMessage(message) {
    this.showMessage(message, "success");
  }

  // Show error message
  showErrorMessage(message) {
    this.showMessage(message, "error");
  }

  // Show message with auto-hide
  showMessage(message, type = "info") {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".notification-message");
    existingMessages.forEach((msg) => msg.remove());

    // Create message element
    const messageEl = document.createElement("div");
    messageEl.className = `notification-message ${type}`;
    messageEl.textContent = message;

    // Style the message
    Object.assign(messageEl.style, {
      position: "fixed",
      top: "10%",
      left: "50%",
      padding: "15px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "600",
      zIndex: "10000",
      transform: "translate(-50%, -150%)",
      transition: "transform 0.3s ease",
      backgroundColor:
        type === "success"
          ? "#4CAF50"
          : type === "error"
            ? "#f44336"
            : "#2196F3",
    });

    // Add to page
    document.body.appendChild(messageEl);

    // Animate in
    setTimeout(() => {
      messageEl.style.transform = "translate(-50%, 0)";
    }, 10);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      messageEl.style.transform = "translate(-50%, -200%)";
      setTimeout(() => {
        messageEl.remove();
      }, 300);
    }, 3000);
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
      case "archive":
        this.toggleArchive(noteId);
        break;
      case "soft-delete":
        this.softDelete(noteId);
        break;
      case "restore":
        this.restoreNote(noteId);
        break;
      case "hard-delete":
        this.hardDelete(noteId);
    }
  }

  // View note in a modal/popup
  viewNote(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      // Create a better modal instead of alert
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
                            <div style="white-space: pre-wrap;">${
                              note.content
                            }</div>
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

  // Get recent notes (last 7 days)
  getRecentNotes(days = 7) {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);

    return this.notes.filter(
      (note) => !note.isDeleted && new Date(note.createdAt) >= daysAgo,
    );
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.notesApp = new NotesApp();

  // Create some sample notes if storage is empty (only on first run)
  if (window.notesApp.notes.length === 0) {
    window.notesApp.createNote(
      "Welcome to NotesApp!",
      "This is your first note. You can edit this text by clicking on it. Use the buttons below to star, archive, or delete notes.\n\nTip: Press Ctrl+N (or Cmd+N) to quickly create a new note!",
    );
    window.notesApp.createNote(
      "Getting Started",
      "Here are some tips to get you started:\n\n• Click on any text to edit it directly\n• Use the star icon to mark important notes\n• Archive notes you want to hide from the main view\n• Use Ctrl+S to save while writing\n• Use Ctrl+Enter to save and go back to notes list\n\nEnjoy organizing your thoughts!",
    );

    // Star the first note as an example
    if (window.notesApp.notes.length > 0) {
      window.notesApp.toggleStar(window.notesApp.notes[0].id);
    }
  }
});
