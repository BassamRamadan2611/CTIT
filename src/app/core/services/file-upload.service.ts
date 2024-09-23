import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  validateAndReadFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      // Check file type
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        reject('Only JPG and PNG files are allowed.');
        return;
      }

      // Check file size
      const maxSizeMB = 5; // Maximum file size in megabytes
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      if (file.size > maxSizeBytes) {
        reject(`File size exceeds ${maxSizeMB}MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        // Resolve with the data URL of the image
        resolve(e.target?.result as string | ArrayBuffer | null);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file); // Read file as data URL
    });
  }
}
