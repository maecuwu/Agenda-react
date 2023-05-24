

export const fileUpload = async (file) => {

    if (!file) return null;

    const cloudURL = 'https://api.cloudinary.com/v1_1/dcxghsgfp/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        
        const response = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if(!response.ok) throw new Error('No se pudo subir la imagen');

        const cloudResponse = await response.json();
        return cloudResponse.secure_url;

    } catch (error) {
        // throw new Error(error.message);
        return null;
    }
}