const fileInput = document.getElementById('upload');
const previewImg = document.getElementById('preview');
const dropArea = document.getElementById('drop-area');

fileInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      previewImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Drag & Drop Support
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('hover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});
