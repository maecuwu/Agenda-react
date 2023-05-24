import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => {

    test('Debe subir el archivo a cloudinary', async () => {

        const imageURL = 'https://res.cloudinary.com/dcxghsgfp/image/upload/v1684222989/journal-app/tree-736885_1280_jquli8.jpg';
        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new File([blob], 'paisaje.jpg');                   

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
    });

    test('Debe return null', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe(null);
    });
});