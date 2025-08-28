class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="nav" role="banner">
        <div class="nav-left">
          <label class="burger" for="burger">
            <input type="checkbox" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="navbar">
          <div class="nav-brand">
            <a href="index.html"><span class="notes">Notes</span>App</a>
          </div>
          <nav class="links" role="navigation" aria-label="Main navigation">
            <a href="index.html" class="text-wrapper" aria-current="page">Home</a>
            <a href="about.html" class="text-wrapper">About</a>
            <a href="" class="text-wrapper">Documentation</a>
          </nav>
          <a href="contact.html">
            <button class="btn-contact" type="button" aria-label="Contact us">
              <span class="contact">Contact Us</span>
            </button>
          </a>
        </div>
        <style>
          /* Navigation Bar Start */
          .nav {
            position: sticky;
            top: 0;
            z-index: 3;
            display: flex;
            flex-direction: row;
            padding: 16px 10px;
            align-items: center;
            background-image: linear-gradient(65deg, #101010 0%, #171717 50%, #101010 100%);
          }

          .navbar {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
          }

          .nav-left {
            padding-left: 11px;
            padding-right: 21px;
          }

          /*Start of Burger Menu*/
          .burger {
            position: relative;
            width: 30px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            display: block;
          }

          .burger input {
            display: none;
          }

          .burger span {
            display: block;
            position: absolute;
            height:9%;
            width: 100%;
            background: white;
            border-radius: 9px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
          }

          .burger span:nth-of-type(1) {
            top: 0px;
            transform-origin: left center;
          }

          .burger span:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
            transform-origin: left center;
          }

          .burger span:nth-of-type(3) {
            top: 100%;
            transform-origin: left center;
            transform: translateY(-100%);
          }

          .burger input:checked ~ span:nth-of-type(1) {
            transform: rotate(45deg);
            top: 0px;
            left: 5px;
          }

          .burger input:checked ~ span:nth-of-type(2) {
            width: 0%;
            opacity: 0;
          }

          .burger input:checked ~ span:nth-of-type(3) {
            transform: rotate(-45deg);
            top: 28px;
            left: 5px;
          }
          /*End of Burger Menu*/

          .nav-brand a {
            font-family: 'Ubuntu Medium', sans-serif;
            color: white;
            text-decoration: none;
            font-size: 32px;
          }

          .notes {
            background: linear-gradient(75deg, #59FF72 0%, #329404 100%);
            background-clip: text;
            color: transparent;
          }

          .links {
            display: flex;
            justify-content: space-between;
            gap: 120px;
            padding-top: 4px;  
          }

          .links a {
            color: white;
            text-decoration: none;
            font-size: 18px;
            transition: all 0.2s ease-out;
          }

          .btn-contact {
            background: linear-gradient(75deg, #59FF72 0%, #329404 100%);
            font-size: 20px;
            border-radius: 8px;
            border-style: none;
            margin-right: 11px;
            padding: 10px 5px;
            cursor: pointer;
            transition: transform 0.3s ease-out;
          }

          .btn-contact:hover {
            transform: scale(1.05);
            color: white;
          }

          .contact {
            font-family: 'Ubuntu', sans-serif;
            padding: 20px;
          }

          
          /* Navigation Bar End */
        </style>
      </header>
    `;
  }
}

customElements.define("nav-bar", Navbar);
