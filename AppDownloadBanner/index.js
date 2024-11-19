(function () {
    try {
      // Define HTML content
      const componentHTML = `
        <div class="qr-code-container">
          <div class="qr-code-box">
            <div class="qr-code-image-box">
              <img
                id="qrCodeImage"
                src="/images/appleQR.svg"
                alt="QR Code"
                class="qr-code-image"
              />
            </div>
            <div class="button-group">
              <button
                id="googleButton"
                class="qr-button"
                onclick="updateQR('/images/apkQR.svg', 'https://play.google.com/store/apps/details?id=com.wishup.clientapp', 'google')"
              >
                <img class="icon" src="/images/playstore-white.png"></img>
              </button>
              <button
                id="appleButton"
                class="qr-button active"
                onclick="updateQR('/images/appleQR.svg', 'https://apps.apple.com/in/app/wishup-office-in-your-pocket/id6477771600', 'apple')"
              >
                <img class="icon" src="/images/apple-white-logo.png"></img>
              </button>
            </div>
            <a
              id="downloadLink"
              href="https://apps.apple.com/in/app/wishup-office-in-your-pocket/id6477771600"
              target="_blank"
              class="download-link"
            >
              Download Our App
            </a>
          </div>
          <button id="toggleQR" class="toggle-button" onclick="toggleQR()">
            X
          </button>
        </div>
      `;
  
      // Define CSS styles
      const css = `
        .qr-code-container {
          width: 180px;
          height: auto;
          position: fixed;
          z-index: 900;
          right: 40px;
          bottom: 80px;
        }
  
        .qr-code-box {
          background: linear-gradient(97.15deg, #00427f 0%, rgba(13, 129, 237, 1) 99.57%);
          border-radius: 10px;
          padding: 12px 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
  
        .qr-code-image-box {
          background-color: #ffffff;
          border-radius: 6px;
          margin: 0 auto;
          padding: 2px;
          margin-bottom: 20px;
          width: 142px;
          height: 142px;
        }
  
        .qr-code-image {
          border-radius: 6px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          display: block;
        }
  
        .button-group {
          display: flex;
          justify-content: space-around;
          margin-bottom: 15px;
        }
  
        .qr-button {
          background: transparent;
          border: 1px solid transparent;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 18px;
          cursor: pointer;
        }
  
        .qr-button.active {
          border-color: white;
        }
  
        .qr-button .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
        }
  
        .download-link {
          display: block;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          text-decoration: none;
          margin-top: 10px;
          font-size: 17px;
        }
  
        .download-link:hover {
          text-decoration: none;
          color: #ffffff;
        }
  
        .toggle-button {
          position: absolute;
          bottom: -48px;
          right: 33px;
          width: 31px;
          height: 31px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1466b8;
          color: #ffffff;
          border: none;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          font-size: 12px;
        }
  
        .qr-code-container.hidden .qr-code-box {
          display: none;
        }
      `;
  
      // Define JavaScript logic
      const js = `
        function updateQR(imgSrc, link, selected) {
          const qrCodeImage = document.getElementById("qrCodeImage");
          const downloadLink = document.getElementById("downloadLink");
          const googleButton = document.getElementById("googleButton");
          const appleButton = document.getElementById("appleButton");
  
          qrCodeImage.src = imgSrc;
          downloadLink.href = link;
  
          if (selected === "google") {
            googleButton.classList.add("active");
            appleButton.classList.remove("active");
          } else if (selected === "apple") {
            appleButton.classList.add("active");
            googleButton.classList.remove("active");
          }
        }
  
        function toggleQR() {
          const qrContainer = document.querySelector(".qr-code-container");
          const closeButton = document.getElementById("toggleQR");
  
          qrContainer.classList.toggle("hidden");
          if (qrContainer.classList.contains("hidden")) {
            closeButton.innerHTML = '<img src="/images/download2.png" height="14px" width="14px" class="download-center"/>';
          } else {
            closeButton.innerHTML = "X";
          }
        }
      `;
  
      // Inject CSS
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
  
      // Inject HTML
      const div = document.createElement("div");
      div.innerHTML = componentHTML;
      document.body.appendChild(div);
  
      // Inject JavaScript
      const script = document.createElement("script");
      script.textContent = js;
      document.body.appendChild(script);
    } catch (error) {
      console.error("Failed to inject QR banner:", error);
    }
  })();
  