const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    const uploadButton = document.getElementById('upload-button');
    uploadButton.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf, .txt';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = {
                    fileName: file.name,
                    fileContent: reader.result
                };
                const existingFiles = JSON.parse(localStorage.getItem(`files_${loggedInUser.email}`)) || [];
                existingFiles.push(fileData);
                localStorage.setItem(`files_${loggedInUser.email}`, JSON.stringify(existingFiles));
                displayUploadedFiles();
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    });

    const displayUploadedFiles = () => {
        const existingFiles = JSON.parse(localStorage.getItem(`files_${loggedInUser.email}`)) || [];
        const uploadedFilesElement = document.getElementById('uploaded-files');
        uploadedFilesElement.innerHTML = '';
        existingFiles.forEach((file) => {
            const fileElement = document.createElement('div');
            fileElement.innerHTML = `
                <a href="${file.fileContent}" download="${file.fileName}">${file.fileName}</a>
            `;
            uploadedFilesElement.appendChild(fileElement);
        });
    };

    displayUploadedFiles();

    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', () => {
        const existingFiles = JSON.parse(localStorage.getItem(`files_${loggedInUser.email}`)) || [];
        const uploadedFilesElement = document.getElementById('uploaded-files');
        uploadedFilesElement.innerHTML = '';
        existingFiles.forEach((file) => {
            const fileElement = document.createElement('div');
            fileElement.innerHTML = `
                <input type="checkbox" id="${file.fileName}" name="file" value="${file.fileName}">
                <label for="${file.fileName}">${file.fileName}</label>
            `;
            uploadedFilesElement.appendChild(fileElement);
        });

        const confirmDeleteButton = document.createElement('button');
        confirmDeleteButton.textContent = 'Confirm Delete';
        uploadedFilesElement.appendChild(confirmDeleteButton);

        confirmDeleteButton.addEventListener('click', () => {
            const selectedFiles = [];
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    selectedFiles.push(checkbox.value);
                }
            });

            const updatedFiles = existingFiles.filter((file) => !selectedFiles.includes(file.fileName));
            localStorage.setItem(`files_${loggedInUser.email}`, JSON.stringify(updatedFiles));
            displayUploadedFiles();
        });
    });

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}