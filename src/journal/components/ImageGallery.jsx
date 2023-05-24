import { ImageList, ImageListItem } from "@mui/material";


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export const ImageGallery = ({ images }) => {

    return (
        <ImageList
            sx={{ width: '100%', height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {images.map((item) => (
                <ImageListItem key={item} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item, 121, item.rows, item.cols)}
                        alt='Imagen de la nota'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}