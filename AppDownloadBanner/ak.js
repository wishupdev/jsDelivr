(function () {
  try {
    // QR Code Module
    const QRCodeModule = {
      config: {
        position: "left-bottom", // Default position: right-bottom
      },

      init() {
        this.injectStyles();
        this.injectHTML();
        this.attachEventListeners();
        this.applyPosition();
      },

      injectStyles() {
        const css = `
            .qr-code-container {
              width: 180px;
              height: auto;
              position: fixed;
              z-index: 900;
              display: flex;
              flex-direction: column;
              align-items: center;
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
              margin-top: 10px;
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
        
            /* Hide the banner on mobile devices */
            @media screen and (max-width: 768px) {
              .qr-code-container {
                display: none;
              }
            }
          `;
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
      },

      injectHTML() {
        const componentHTML = `
            <div class="qr-code-container">
              <div class="qr-code-box">
                <div class="qr-code-image-box">
                  <img
                    id="qrCodeImage"
                    src="https://cms-assets.wishup.co/AppDownloadBannerAssets/appleQR.png"
                    alt="QR Code"
                    class="qr-code-image"
                  />
                </div>
                <div class="button-group">
                  <button
                    id="googleButton"
                    class="qr-button"
                    data-img="https://cms-assets.wishup.co/AppDownloadBannerAssets/apkQR.png"
                    data-link="https://play.google.com/store/apps/details?id=com.wishup.clientapp"
                    data-target="google"
                  >
                    <img class="icon" src="https://cms-assets.wishup.co/AppDownloadBannerAssets/playstore-white.png"></img>
                  </button>
                  <button
                    id="appleButton"
                    class="qr-button active"
                    data-img="https://cms-assets.wishup.co/AppDownloadBannerAssets/appleQR.png"
                    data-link="https://apps.apple.com/in/app/wishup-office-in-your-pocket/id6477771600"
                    data-target="apple"
                  >
                    <img class="icon" src="https://cms-assets.wishup.co/AppDownloadBannerAssets/apple-white-logo.png"></img>
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
              <button id="toggleQR" class="toggle-button">
                X
              </button>
            </div>
          `;
        const div = document.createElement("div");
        div.innerHTML = componentHTML;
        document.body.appendChild(div);
      },

      attachEventListeners() {
        document.querySelectorAll(".qr-button").forEach((button) => {
          button.addEventListener("click", (event) => {
            const target = event.currentTarget;
            this.updateQR(
              target.dataset.img,
              target.dataset.link,
              target.dataset.target
            );
          });
        });

        document.getElementById("toggleQR").addEventListener("click", () => {
          this.toggleQR();
        });
      },

      applyPosition() {
        const qrContainer = document.querySelector(".qr-code-container");
        qrContainer.style.transform = ""; // Reset the transform property
      
        switch (this.config.position) {
          case "left-bottom":
            qrContainer.style.left = "40px";
            qrContainer.style.bottom = "80px";
            qrContainer.style.right = "auto";
            break;
          case "center":
            qrContainer.style.left = "50%";
            qrContainer.style.bottom = "80px";
            qrContainer.style.right = "auto";
            qrContainer.style.transform = "translateX(-50%)"; // Only apply for center
            break;
          case "right-bottom":
          default:
            qrContainer.style.right = "40px";
            qrContainer.style.bottom = "80px";
            qrContainer.style.left = "auto";
            break;
        }
      },

      updateQR(imgSrc, link, selected) {
        const qrCodeImage = document.getElementById("qrCodeImage");
        const downloadLink = document.getElementById("downloadLink");
        const buttons = document.querySelectorAll(".qr-button");

        qrCodeImage.src = imgSrc;
        downloadLink.href = link;

        buttons.forEach((button) =>
          button.classList.toggle("active", button.dataset.target === selected)
        );
      },

      toggleQR() {
        const qrContainer = document.querySelector(".qr-code-container");
        const closeButton = document.getElementById("toggleQR");

        qrContainer.classList.toggle("hidden");
        closeButton.innerHTML = qrContainer.classList.contains("hidden")
          ? '<img src="https://cms-assets.wishup.co/AppDownloadBannerAssets/download.png" height="14px" width="14px" class="download-center"/>'
          : "X";
      },
    };

    // Update config to set position
    QRCodeModule.config.position = "center"; // Set to "left-bottom", "right-bottom", or "center"
    QRCodeModule.init();
  } catch (error) {
    console.error("Failed to inject QR banner:", error);
  }
})();
