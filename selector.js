document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('galeria');
    if (galeria) { // Si existe la galería
        const imagenes = galeria.querySelectorAll('.imagen'); // Selecciono todos los contenedores de imágenes
        if (imagenes.length > 0) { // Si hay imágenes dentro de la galería
            imagenes.forEach(imagen => {
                const checkbox = imagen.querySelector('.checkbox'); // Selecciono el checkbox dentro del contenedor de imagen individual
                const img = imagen.querySelector('img'); // Selecciono la imagen dentro del contenedor de imagen individual

                // Agregar evento de cambio al checkbox
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {//si esta marcado
                        selectedImages.push(img.src);//agrego link img a lista
                        console.log(`Imagen añadida: ${img.src}`);
                    } else {
                        const index = selectedImages.indexOf(img.src);
                        if (index > -1) {
                            selectedImages.splice(index, 1);//elimino link img de lista
                        }
                        console.log(`Imagen eliminada: ${img.src}`);
                    }
                    console.log("Lista de imágenes seleccionadas:", selectedImages);
                    return selectedImages;
                });
            });
        } else {
            console.log("No hay imágenes en la galería");
        }
    } else {
        console.error('La galeria no se encontró.');
    }
});


const selectedImages = []; // Lista para almacenar los links de las imágenes seleccionadas

// Función para obtener el nombre del archivo de una URL
function getFileNameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1);
}


async function descargarImagenes() {
    if (selectedImages.length === 0) {
        console.log("No hay imágenes para descargar.");
        return;
    }

    if (selectedImages.length === 1) {
        const imageUrl = selectedImages[0];
        const filename = getFileNameFromUrl(imageUrl);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], filename, { type: response.headers.get('Content-Type') });

        // Crear un enlace de descarga temporal
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = filename;

        // Simular clic en el enlace para iniciar la descarga
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remover el enlace temporal después de la descarga
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
    } else {
        const zip = new JSZip();

        for (const imageUrl of selectedImages) {
            const filename = getFileNameFromUrl(imageUrl);
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            zip.file(filename, blob);
        }

        zip.generateAsync({ type: 'blob' }).then(content => {
            // Crear un enlace de descarga temporal
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(content);
            downloadLink.download = 'imagenes.zip';

            // Simular clic en el enlace para iniciar la descarga
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Remover el enlace temporal después de la descarga
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadLink.href);
        });
    }
}

  

  
  