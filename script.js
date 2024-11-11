// Select file input, gallery container, and delete buttons
const fileInput = document.getElementById("fileInput");
const galleryContainer = document.getElementById("galleryContainer");
const deleteLastBtn = document.getElementById("deleteLastBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Load images from local storage on page load
document.addEventListener("DOMContentLoaded", loadImages);

// Event listener for file input (to upload images)
fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageSrc = e.target.result;
            addImageToGallery(imageSrc);
            saveImageToLocalStorage(imageSrc);
        };
        reader.readAsDataURL(file);
    });
});

// Function to add image to the gallery
function addImageToGallery(src) {
    const div = document.createElement("div");
    div.className = "gallery-item position-relative";
    
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery Image";
    img.className = "gallery-img";
    
    div.appendChild(img);
    galleryContainer.appendChild(div);
}

// Function to save image to local storage
function saveImageToLocalStorage(imageSrc) {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.push(imageSrc);
    localStorage.setItem("images", JSON.stringify(images));
}

// Function to load images from local storage
function loadImages() {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.forEach(imageSrc => addImageToGallery(imageSrc));
}

// Function to delete the last uploaded image
deleteLastBtn.addEventListener("click", () => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    if (images.length > 0) {
        images.pop();  // Remove last image from local storage
        localStorage.setItem("images", JSON.stringify(images));
        galleryContainer.removeChild(galleryContainer.lastChild);  // Remove last image from gallery
    }
});

// Function to clear all images from gallery and local storage
deleteAllBtn.addEventListener("click", () => {
    galleryContainer.innerHTML = "";  // Clear the gallery display
    localStorage.removeItem("images");  // Remove all images from local storage
});
