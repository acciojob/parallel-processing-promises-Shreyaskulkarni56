
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = () => {
      reject(new Error("Failed to download image"));
    };

    img.src = url;
  });
}

function downloadImages() {
  // Show loading spinner
  loading.style.display = "block";

  // Clear previous results and errors
  output.innerHTML = "";
  error.innerHTML = "";

  Promise.all(
    images.map(image => downloadImage(image.url))
  )
    .then(downloadedImages => {
      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      error.textContent = err.message;
    })
    .finally(() => {
      // Hide loading spinner after success or failure
      loading.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);
