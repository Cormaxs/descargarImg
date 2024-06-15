async function downloadImage(imageUrl, filename) {
    try {
      const response = await fetch(imageUrl, {
        headers: {
          'Accept': 'image/*'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
  
      const blob = await response.blob();
      const file = new File([blob], filename, { type: response.headers.get('Content-Type') });
  
      // Create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = filename;
  
      // Simulate click on the link to initiate the download
      downloadLink.click();
  
      // Remove the temporary link after the download
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error(`Error downloading image: ${error.message}`);
    }
  }
  
  // Example usage (Consider using a different format if available)
  const imageUrl = 'https://i.ibb.co/9WKjvbj/Bama-Fotografia-08.webp'; // Consider a format like JPG or PNG
  const filename = 'image-download.jpg';
  
  downloadImage(imageUrl, filename);
  