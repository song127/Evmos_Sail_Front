function ImageLoader({w, h, src, round, ...props}) {
    return (
        <img style={{width: w, height: h, borderRadius: round}} src={src}>
        </img>
    );
}

export default ImageLoader