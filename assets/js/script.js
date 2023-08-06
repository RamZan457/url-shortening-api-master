function myFunction() {
  var x = document.getElementById("myLinks");
  var y = document.getElementsByClassName("mobile-container");
  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "none";
  } else {
    x.style.display = "block";
    y.style.display = "block";
  }
}
async function shortenLink(event) {
  event.preventDefault();
  const urlInput = document.getElementById("url");
  if (urlInput.value === "") {
    const invalidDiv = document.getElementById("lead");
    invalidDiv.innerHTML = "Enter Valid link";
    setTimeout(() => {
      invalidDiv.style.display = "none";
    }, 2000);
    document.getElementById("form").appendChild(invalidDiv);
  } else {
    const url = urlInput.value;
    const apiKey = "9a2bd90525c44ce08039bd82928151ef";

    try {
      const response = await fetch(`https://api.rebrandly.com/v1/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
        body: JSON.stringify({ destination: url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data.shortUrl) {
        const shortenedLink = data.shortUrl;
        const linkDiv = document.createElement("div");
        linkDiv.innerHTML = `
                <p><a href="${shortenedLink}" target="_blank">${shortenedLink}</a></p>
                <button onclick="copyLinkToClipboard('${shortenedLink}', this)">Copy</button>
                `;
        document.getElementById("main-div2").appendChild(linkDiv);
      } else {
        throw new Error("Failed to shorten link.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}

function copyLinkToClipboard(link, button) {
  const tempInput = document.createElement("input");
  tempInput.setAttribute("value", link);
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  button.textContent = "Copied!";
  setTimeout(() => {
    button.textContent = "Copy";
  }, 1500); // Reset the button text to "Copy" after 1.5 seconds
}
