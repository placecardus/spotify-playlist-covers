// Spotify Playlist Cover Maker Demo

// Canvas setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

// Function to add text to the canvas
function addText(text, fontSize, color, x, y) {
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
}

// Function to add an image to the canvas
function addImage(src, x, y, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Function to generate the cover
async function generateCover(playlistName, backgroundImage) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Add background image
  await addImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  
  // Add semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add playlist name
  addText(playlistName, 36, 'white', canvas.width / 2, canvas.height / 2);
  
  // Add "Spotify Playlist" text
  addText('Spotify Playlist', 18, '#1DB954', canvas.width / 2, canvas.height - 30);
}

// Function to download the cover
function downloadCover() {
  const link = document.createElement('a');
  link.download = 'spotify-playlist-cover.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Usage example
const generateButton = document.createElement('button');
generateButton.textContent = 'Generate Cover';
generateButton.onclick = () => {
  const playlistName = prompt('Enter playlist name:', 'My Awesome Playlist');
  const backgroundImage = 'https://example.com/path/to/background-image.jpg';
  generateCover(playlistName, backgroundImage).then(() => {
    console.log('Cover generated successfully!');
  });
};

const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download Cover';
downloadButton.onclick = downloadCover;

document.body.appendChild(generateButton);
document.body.appendChild(downloadButton);
