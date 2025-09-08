<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="assets\Logos NotesAPP.svg" width="10%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# NOTESAPP

<em></em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/DiaztMF/NotesAPP?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff&cacheSeconds=60" alt="license">
<img src="https://img.shields.io/github/last-commit/DiaztMF/NotesAPP?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/badge/tech-JavaScript-0080ff?style=default&logo=javascript&logoColor=white" alt="tech">
<img src="https://img.shields.io/github/languages/count/DiaztMF/NotesAPP?style=default&color=0080ff" alt="repo-language-count">

<!-- default option, no dependency badges. -->


<!-- default option, no dependency badges. -->

</div>
<br>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

NotesApp is a simple and modern note-taking web application built with HTML, CSS, and JavaScript.
The application allows users to create, edit, delete, and manage their notes seamlessly with a responsive and user-friendly interface.

---

## Features

📝 CRUD Functionality: Create, Read, Update, and Delete notes.

💾 Local Storage Support: Notes are saved directly in the browser’s local storage.

🎨 Responsive Design: Clean UI with dark mode support.

🔔 Extra Features: Documentation, user feedback, and modal-based editing for a better user experience.

📤 Third-party Service: Integrated with EmailJS to send user feedback directly to the developer’s email.

---

## Project Structure

```sh
└── NotesAPP/
    ├── .github
    │   └── workflows
    ├── README.md
    ├── about.html
    ├── archive.html
    ├── assets
    │   ├── Ellipse 1.svg
    │   ├── Ellipse 2.svg
    │   ├── Logos NotesAPP.svg
    │   ├── book.png
    │   └── pencils.png
    ├── components
    │   ├── Navbar.js
    │   └── Sidebar.js
    ├── contact.html
    ├── eslint.config.mjs
    ├── export.html
    ├── favorite.html
    ├── fonts
    │   ├── Inter_18pt-Regular.ttf
    │   ├── Ubuntu-Bold.ttf
    │   ├── Ubuntu-Light.ttf
    │   ├── Ubuntu-Medium.ttf
    │   └── Ubuntu-Regular.ttf
    ├── import.html
    ├── index.html
    ├── index.js
    ├── notes.html
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── script
    │   └── style
    ├── trash.html
    └── write.html
```

### Project Index

<details open>
	<summary><b><code>notesapp</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/index.js'>index.js</a></b></td>
					<td style='padding: 8px;'>Main entry point of the application, initializes and connects features.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/import.html'>import.html</a></b></td>
					<td style='padding: 8px;'>Page for importing notes from external files.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>Dependency lock file to ensure consistency across installations.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/notes.html'>notes.html</a></b></td>
					<td style='padding: 8px;'>Main page that displays the list of notes.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/export.html'>export.html</a></b></td>
					<td style='padding: 8px;'>Page for exporting notes to external file formats.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/favorite.html'>favorite.html</a></b></td>
					<td style='padding: 8px;'>Page for displaying favorite notes.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/archive.html'>archive.html</a></b></td>
					<td style='padding: 8px;'>Page for archived notes that have been moved from the main list.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/eslint.config.mjs'>eslint.config.mjs</a></b></td>
					<td style='padding: 8px;'>ESLint configuration file for maintaining JavaScript code quality.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/write.html'>write.html</a></b></td>
					<td style='padding: 8px;'>Page for writing a new note.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/trash.html'>trash.html</a></b></td>
					<td style='padding: 8px;'>Page for displaying deleted notes (trash bin).</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>Node.js configuration file containing project dependencies and scripts.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/about.html'>about.html</a></b></td>
					<td style='padding: 8px;'>Page that provides information about the NotesApp project.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/contact.html'>contact.html</a></b></td>
					<td style='padding: 8px;'>Page that contains contact details or feedback form for users.</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/index.html'>index.html</a></b></td>
					<td style='padding: 8px;'>Landing page of the application, entry point for users.</code></td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- fonts Submodule -->
	<details>
		<summary><b>fonts</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ fonts</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/fonts/Ubuntu-Medium.ttf'>Ubuntu-Medium.ttf</a></b></td>
					  <td style='padding: 8px;'>Ubuntu-Medium font file used for the application’s typography.</td>
					</tr>
					<tr style='border-bottom: 1px solid #eee;'>
					  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/fonts/Ubuntu-Regular.ttf'>Ubuntu-Regular.ttf</a></b></td>
					  <td style='padding: 8px;'>Ubuntu-Regular font file used for the application’s typography.</td>
					</tr>
					<tr style='border-bottom: 1px solid #eee;'>
					  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/fonts/Ubuntu-Light.ttf'>Ubuntu-Light.ttf</a></b></td>
					  <td style='padding: 8px;'>Ubuntu-Light font file used for the application’s typography.</td>
					</tr>
					<tr style='border-bottom: 1px solid #eee;'>
					  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/fonts/Ubuntu-Bold.ttf'>Ubuntu-Bold.ttf</a></b></td>
					  <td style='padding: 8px;'>Ubuntu-Bold font file used for the application’s typography.</td>
					</tr>
					<tr style='border-bottom: 1px solid #eee;'>
					  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/fonts/Inter_18pt-Regular.ttf'>Inter_18pt-Regular.ttf</a></b></td>
					  <td style='padding: 8px;'>Inter-Regular font file used for the application’s typography.</td>
					</tr>
			</table>
		</blockquote>
	</details>
	<!-- components Submodule -->
	<details>
		<summary><b>components</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ components</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
				  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/components/Sidebar.js'>Sidebar.js</a></b></td>
				  <td style='padding: 8px;'>Defines a reusable sidebar component that provides quick navigation links within the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
				  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/components/Navbar.js'>Navbar.js</a></b></td>
				  <td style='padding: 8px;'>Defines a reusable navigation bar component with branding, navigation links, and a contact button.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<!-- style Submodule -->
			<details>
				<summary><b>style</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.style</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/write.css'>write.css</a></b></td>
							<td style='padding: 8px;'>Stylesheet for the writes page, including layout, form styling, note container, and responsive design.</code></td>	
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
						  <td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/globals.css'>globals.css</a></b></td>
						  <td style='padding: 8px;'>Global stylesheet defining base styles, smooth load animation, scrollbar behavior, and custom font imports.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/import.css'>import.css</a></b></td>
							<td style='padding: 8px;'>Styles the file import UI, including upload container, drag-and-drop area, buttons, and responsive layout.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/about.css'>about.css</a></b></td>
							<td style='padding: 8px;'>Defines the About page layout using grid, with styled titles, feature sections, and credits for tech stacks and reference.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/contact.css'>contact.css</a></b></td>
							<td style='padding: 8px;'>Styles the Contact Page with a responsive two-column layout, form design, social media icons, and animated loader overlay./code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/styles.css'>styles.css</a></b></td>
							<td style='padding: 8px;'>Styles the landing page with gradient backgrounds, slogan typography, "Get Started" button, and decorative images.</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/style/notes.css'>notes.css</a></b></td>
							<td style='padding: 8px;'>Styles the notes page with card layouts, note headers, content, metadata, star icons, and action buttons with hover effects.</code></td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- script Submodule -->
			<details>
				<summary><b>script</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.script</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/script/import-handler.js'>import-handler.js</a></b></td>
							<td style='padding: 8px;'>Javascript code for import notes handler.</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/script/main.js'>main.js</a></b></td>
							<td style='padding: 8px;'>Javascript code for main page handler</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/script/export-handler.js'>export-handler.js</a></b></td>
							<td style='padding: 8px;'>Javascript code for export notes handler</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/src/script/integrated-notes-system.js'>integrated-notes-system.js</a></b></td>
							<td style='padding: 8px;'>Javascript code for notes CRUD handler</code></td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- .github Submodule -->
	<details>
		<summary><b>.github</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ .github</b></code>
			<!-- workflows Submodule -->
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ .github.workflows</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/DiaztMF/NotesAPP/blob/master/.github/workflows/readme.yml'>readme.yml</a></b></td>
							<td style='padding: 8px;'>Workflow code for readme generation</code></td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** Javascript
- **Package Manager:** Npm

### Installation

Build NotesAPP from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/DiaztMF/NotesAPP
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd NotesAPP
    ```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	❯ npm install

### Usage

Run the project with:

**Using live server:**

---

## Contributing

- **💬 [Join the Discussions](https://github.com/DiaztMF/NotesAPP/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/DiaztMF/NotesAPP/issues)**: Submit bugs found or log feature requests for the `NotesAPP` project.
- **💡 [Submit Pull Requests](https://github.com/DiaztMF/NotesAPP/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/DiaztMF/NotesAPP
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/DiaztMF/NotesAPP/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=DiaztMF/NotesAPP">
   </a>
</p>
</details>

---

## License

Notesapp is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="right">

[![][back-to-top]](#top)

</div>


[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square


---
