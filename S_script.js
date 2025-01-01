document.getElementById('fileUpload').addEventListener('change', function () {
  const fileList = document.getElementById('fileList');
  const files = this.files;

  // Loop through all selected files and append them to the file list
  Array.from(files).forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-list-item';

    // File details
    const fileDetails = document.createElement('span');
    fileDetails.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;

    // Number of prints input
    const printsInput = document.createElement('input');
    printsInput.type = 'number';
    printsInput.min = 1;
    printsInput.value = 1;
    printsInput.placeholder = 'Number of Prints';
    
    // Print type selection (Color or Black & White)
    const printTypeSelect = document.createElement('select');
    const colorOption = document.createElement('option');
    colorOption.value = 'Black & White ';
    colorOption.textContent = 'Black & White ';
    const bwOption = document.createElement('option');
    bwOption.value = 'bw';
    bwOption.textContent = 'color';
    printTypeSelect.appendChild(colorOption);
    printTypeSelect.appendChild(bwOption);

    // View button
    const viewButton = document.createElement('button');
    viewButton.className = 'view-btn';
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', () => previewFile(file));

    // Cancel button (remove file)
    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-btn';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => cancelFile(file, fileItem));

    // Append elements to the file item
    fileItem.appendChild(fileDetails);
    fileItem.appendChild(printsInput);
    fileItem.appendChild(printTypeSelect);
    fileItem.appendChild(viewButton);
    fileItem.appendChild(cancelButton);
    fileList.appendChild(fileItem);
  });

  // If no files are selected, display a message
  if (files.length === 0) {
    fileList.innerHTML = '<p>No files selected</p>';
  }
});

function previewFile(file) {
  const previewModal = document.getElementById('previewModal');
  const previewContent = document.getElementById('previewContent');
  previewContent.innerHTML = ''; // Clear previous content

  const reader = new FileReader();
  reader.onload = function (event) {
    if (file.type.startsWith('text/')) {
      const pre = document.createElement('pre');
      pre.textContent = event.target.result;
      previewContent.appendChild(pre);
    } else if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.style.maxWidth = '100%';
      previewContent.appendChild(img);
    } else if (file.type === 'application/pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = event.target.result;
      iframe.style.width = '100%';
      iframe.style.height = '500px';
      previewContent.appendChild(iframe);
    } else {
      previewContent.textContent = 'Preview not available for this file type.';
    }
  };
  reader.readAsDataURL(file);
  previewModal.style.display = 'block';
}

document.getElementById('closeModal').addEventListener('click', function () {
  document.getElementById('previewModal').style.display = 'none';
});

function cancelFile(file, fileItem) {
  // Remove the file item from the list
  fileItem.remove();
}
