class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="sidebar" id="sidebar">
        <div class="sidebar-logo">    
          <div class="sidebar-brand">
            <a href="index.html"><span class="notes">Notes</span>App</a>
          </div>
          <div class="sidebar-right">
            <label class="burger2" for="burger2">
              <input type="checkbox" id="burger2">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
        <div class="sidebar-menu">
          <div class="menu">
            <p class="menu-title">Overview</p>
            <div class="opt">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor"><path fill="currentcolor" d="M12.973 2.5c-.21 0-.415 0-.588.014-.19.016-.415.052-.642.168-.313.16-.568.414-.728.728a1.682 1.682 0 0 0-.168.641c-.014.174-.014.379-.014.59v2.386c0 .21 0 .415.014.588.016.19.053.415.168.642.16.313.415.568.728.728.226.115.451.152.642.168.173.014.378.014.588.014h2.387c.21 0 .415 0 .588-.014.191-.016.416-.053.642-.168.314-.16.569-.415.728-.728.116-.227.152-.451.168-.642.014-.173.014-.378.014-.588V4.64c0-.21 0-.415-.014-.589a1.685 1.685 0 0 0-.168-.641 1.666 1.666 0 0 0-.728-.728 1.685 1.685 0 0 0-.642-.168c-.173-.014-.378-.014-.588-.014h-2.387ZM4.64 10.833c-.21 0-.415 0-.589.014-.19.016-.415.053-.641.168-.314.16-.569.415-.728.728-.116.226-.152.451-.168.642-.014.173-.014.378-.014.588v2.387c0 .21 0 .415.014.588.016.191.052.416.168.642.16.314.414.569.728.728.226.116.451.152.641.168.174.014.379.014.59.014h2.386c.21 0 .415 0 .588-.014.19-.016.415-.052.642-.168.313-.16.568-.414.728-.728.115-.226.152-.451.168-.642.014-.173.014-.378.014-.588v-2.387c0-.21 0-.415-.014-.588a1.684 1.684 0 0 0-.168-.642 1.666 1.666 0 0 0-.728-.728 1.682 1.682 0 0 0-.642-.168c-.173-.014-.378-.014-.588-.014H4.64ZM12.973 10.833c-.21 0-.415 0-.588.014-.19.016-.415.053-.642.168-.313.16-.568.415-.728.728-.115.226-.152.451-.168.642-.014.173-.014.378-.014.588v2.387c0 .21 0 .415.014.588.016.191.053.416.168.642.16.314.415.569.728.728.226.116.451.152.642.168.173.014.378.014.588.014h2.387c.21 0 .415 0 .588-.014.191-.016.416-.052.642-.168.314-.16.569-.414.728-.728.116-.226.152-.451.168-.642.014-.173.014-.378.014-.588v-2.387c0-.21 0-.415-.014-.588a1.684 1.684 0 0 0-.168-.642 1.666 1.666 0 0 0-.728-.728 1.683 1.683 0 0 0-.642-.168c-.173-.014-.378-.014-.588-.014h-2.387ZM4.64 2.5c-.21 0-.415 0-.589.014-.19.016-.415.052-.641.168-.314.16-.569.414-.728.728a1.685 1.685 0 0 0-.168.641c-.014.174-.014.379-.014.59v2.386c0 .21 0 .415.014.588.016.19.052.415.168.642.16.313.414.568.728.728.226.115.451.152.641.168.174.014.379.014.59.014h2.386c.21 0 .415 0 .588-.014.19-.016.415-.053.642-.168.313-.16.568-.415.728-.728.115-.227.152-.451.168-.642.014-.173.014-.378.014-.588V4.64c0-.21 0-.415-.014-.589a1.685 1.685 0 0 0-.168-.641 1.667 1.667 0 0 0-.728-.728 1.685 1.685 0 0 0-.642-.168C7.442 2.5 7.237 2.5 7.027 2.5H4.64Z"/></svg>
              <a href="index.html">Home</a>
            </div>
            <div class="opt">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_164_83)">
              <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.83337 17.2183V15.8333C5.83337 15.3913 6.00897 14.9674 6.32153 14.6548C6.63409 14.3423 7.05801 14.1667 7.50004 14.1667H12.5C12.9421 14.1667 13.366 14.3423 13.6786 14.6548C13.9911 14.9674 14.1667 15.3913 14.1667 15.8333V17.2183" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_164_83">
              <rect width="20" height="20" fill="currentcolor"/>
              </clipPath>
              </defs>
              </svg>
              <a href="about.html">About</a>
            </div>
            <div class="opt">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
              <a href="contact.html">Contact Us</a>
            </div>
            <div class="menu-2">
              <p class="menu-title">Create</p>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_209_352)">
<path d="M17.645 5.6767C18.0856 5.23622 18.3332 4.63876 18.3333 4.01574C18.3333 3.39273 18.0859 2.79521 17.6454 2.35462C17.205 1.91403 16.6075 1.66646 15.9845 1.66638C15.3615 1.6663 14.764 1.91372 14.3234 2.3542L3.20169 13.4784C3.00821 13.6713 2.86512 13.9088 2.78503 14.17L1.68419 17.7967C1.66266 17.8688 1.66103 17.9453 1.67949 18.0182C1.69794 18.0912 1.73579 18.1577 1.78902 18.2109C1.84225 18.264 1.90888 18.3018 1.98183 18.3201C2.05477 18.3384 2.13133 18.3367 2.20336 18.315L5.83086 17.215C6.09183 17.1357 6.32934 16.9934 6.52253 16.8009L17.645 5.6767Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5 4.16663L15.8333 7.49996" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_209_352">
<rect width="20" height="20" fill="currentcolor"/>
</clipPath>
</defs>
</svg>
                <a href="write.html">Write</a>
              </div>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66663 5H4.99996" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66663 8.33337H4.99996" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66663 11.6666H4.99996" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66663 15H4.99996" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 1.66663H5.00004C4.07957 1.66663 3.33337 2.41282 3.33337 3.33329V16.6666C3.33337 17.5871 4.07957 18.3333 5.00004 18.3333H15C15.9205 18.3333 16.6667 17.5871 16.6667 16.6666V3.33329C16.6667 2.41282 15.9205 1.66663 15 1.66663Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.91663 6.66663H12.0833" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.91663 10H13.3333" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.91663 13.3334H11.6666" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="notes.html">Notes</a>
              </div>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 2.5H2.49996C2.03972 2.5 1.66663 2.8731 1.66663 3.33333V5.83333C1.66663 6.29357 2.03972 6.66667 2.49996 6.66667H17.5C17.9602 6.66667 18.3333 6.29357 18.3333 5.83333V3.33333C18.3333 2.8731 17.9602 2.5 17.5 2.5Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33337 6.66663V15.8333C3.33337 16.2753 3.50897 16.6992 3.82153 17.0118C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0118C16.4911 16.6992 16.6667 16.2753 16.6667 15.8333V6.66663" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33337 10H11.6667" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="archive.html">Archive</a>
              </div>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.60416 1.91249C9.64068 1.83871 9.6971 1.7766 9.76704 1.73318C9.83698 1.68976 9.91767 1.66675 9.99999 1.66675C10.0823 1.66675 10.163 1.68976 10.233 1.73318C10.3029 1.7766 10.3593 1.83871 10.3958 1.91249L12.3208 5.81166C12.4476 6.0683 12.6348 6.29033 12.8663 6.4587C13.0979 6.62707 13.3668 6.73675 13.65 6.77833L17.955 7.40833C18.0366 7.42014 18.1132 7.45455 18.1762 7.50766C18.2393 7.56076 18.2862 7.63045 18.3117 7.70883C18.3372 7.78721 18.3402 7.87116 18.3205 7.95119C18.3007 8.03121 18.259 8.10412 18.2 8.16166L15.0867 11.1933C14.8813 11.3934 14.7277 11.6404 14.639 11.913C14.5503 12.1856 14.5292 12.4757 14.5775 12.7583L15.3125 17.0417C15.3269 17.1232 15.3181 17.2071 15.2871 17.2839C15.2561 17.3607 15.2041 17.4272 15.1371 17.4758C15.0701 17.5245 14.9908 17.5533 14.9082 17.5591C14.8256 17.5648 14.7431 17.5472 14.67 17.5083L10.8217 15.485C10.5681 15.3518 10.286 15.2823 9.99958 15.2823C9.71318 15.2823 9.43106 15.3518 9.17749 15.485L5.32999 17.5083C5.25694 17.547 5.17449 17.5644 5.09204 17.5585C5.00958 17.5527 4.93043 17.5238 4.86357 17.4752C4.79672 17.4266 4.74485 17.3601 4.71387 17.2835C4.68289 17.2069 4.67404 17.1231 4.68833 17.0417L5.42249 12.7592C5.47099 12.4764 5.44998 12.1862 5.36128 11.9134C5.27257 11.6406 5.11883 11.3935 4.91333 11.1933L1.79999 8.16249C1.74049 8.10502 1.69832 8.03199 1.6783 7.95172C1.65827 7.87145 1.66119 7.78717 1.68673 7.70848C1.71226 7.6298 1.75938 7.55986 1.82272 7.50665C1.88607 7.45343 1.96308 7.41907 2.04499 7.40749L6.34916 6.77833C6.63271 6.73708 6.90199 6.62754 7.13381 6.45915C7.36564 6.29076 7.55308 6.06855 7.67999 5.81166L9.60416 1.91249Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="favorite.html">Favorites</a>
              </div>
            </div>
            <div class="menu-3">
              <p class="menu-title">Extras</p>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33337 9.16699V14.167" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6666 9.16699V14.167" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 5H17.5" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66663 5.00033V3.33366C6.66663 2.89163 6.84222 2.46771 7.15478 2.15515C7.46734 1.84259 7.89127 1.66699 8.33329 1.66699H11.6666C12.1087 1.66699 12.5326 1.84259 12.8451 2.15515C13.1577 2.46771 13.3333 2.89163 13.3333 3.33366V5.00033" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="trash.html">Trash</a>
              </div>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 1.66699H5.00004C4.55801 1.66699 4.13409 1.84259 3.82153 2.15515C3.50897 2.46771 3.33337 2.89163 3.33337 3.33366V16.667C3.33337 17.109 3.50897 17.5329 3.82153 17.8455C4.13409 18.1581 4.55801 18.3337 5.00004 18.3337H15C15.4421 18.3337 15.866 18.1581 16.1786 17.8455C16.4911 17.5329 16.6667 17.109 16.6667 16.667V5.83366L12.5 1.66699Z"
                        stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6666 1.66699V5.00033C11.6666 5.44235 11.8422 5.86628 12.1548 6.17884C12.4673 6.4914 12.8913 6.66699 13.3333 6.66699H16.6666"
                        stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 15V10" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 12.5L10 15L12.5 12.5" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="import.html">Import</a>
              </div>
              <div class="opt">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 1.66699H5.00004C4.55801 1.66699 4.13409 1.84259 3.82153 2.15515C3.50897 2.46771 3.33337 2.89163 3.33337 3.33366V16.667C3.33337 17.109 3.50897 17.5329 3.82153 17.8455C4.13409 18.1581 4.55801 18.3337 5.00004 18.3337H15C15.4421 18.3337 15.866 18.1581 16.1786 17.8455C16.4911 17.5329 16.6667 17.109 16.6667 16.667V5.83366L12.5 1.66699Z" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6666 1.66699V5.00033C11.6666 5.44235 11.8422 5.86628 12.1548 6.17884C12.4673 6.4914 12.8913 6.66699 13.3333 6.66699H16.6666" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10V15" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5 12.5L10 10L7.5 12.5" stroke="currentcolor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="export.html">Export</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        /* Sidebar Start */
        .sidebar {  
          position: fixed;
          left: -250px;
          background-color: #171717;
          outline: #101010 solid 1px;
          z-index: 100;
          width: 15rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          padding: 20px 10px
        }

        .sidebar-brand {
          display: flex;
          justify-content: flex-start;
          align-items: center; 
          width: 100%;
          padding-left: 11px;
        }

        .sidebar-brand a {
          font-family: 'Ubuntu Medium', sans-serif;
          color: white;
          text-decoration: none;
          font-size: 32px;
        }

        .sidebar-right {
          padding-left: 15px;
          padding-right: 21px;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          margin: 0 1rem;
          padding: 0;
          font-size: 13px;
        }

        /* Burger Start */
        .burger2 {
            position: relative;
            width: 30px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            display: block;
          }

          .burger2 input {
            display: none;
          }

          .burger2 span {
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

          .burger2 span:nth-of-type(1) {
            top: 0px;
            transform-origin: left center;
          }

          .burger2 span:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
            transform-origin: left center;
          }

          .burger2 span:nth-of-type(3) {
            top: 100%;
            transform-origin: left center;
            transform: translateY(-100%);
          }

          .burger2 input:checked ~ span:nth-of-type(1) {
            transform: rotate(45deg);
            top: 0px;
            left: 5px;
          }

          .burger2 input:checked ~ span:nth-of-type(2) {
            width: 0%;
            opacity: 0;
          }

          .burger2 input:checked ~ span:nth-of-type(3) {
            transform: rotate(-45deg);
            top: 28px;
            left: 5px;
          }
        /* Burger End */

        /* Sidebar Menu 1 Start*/

        .menu-title {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 8px 12px;
          color: #83899F;
          align-items: center;
        }

        .opt {
          display: flex;
          flex-direction: row;
          padding: 10px 12px;
          align-items: center;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .opt:hover {
          background-color: #25324A;
        }

        .opt.active {
          background-color: #25324A;
        }

        .opt:hover a {
          color: #3B8FEE; 
        }

        .opt.active a {
          color: #3B8FEE;
        }

        .opt svg {
          height: auto;
          padding-right: 8px;
        }

        .opt:hover svg {
          color: #6090E4
        }

        .opt.active svg {
          color: #6090E4
        }

        .opt a {
          color: inherit;
          text-decoration: none;
        }

        /* Sidebar Menu End */

        .menu-2 {
          margin-top: 14px;
        }

        .menu-3 {
          margin-top: 14px;
        }
        /* Sidebar End */
              </style>
    `;
  }
}

customElements.define("side-bar", Sidebar);
