function SizeBox({w, h = 'max-content', ...props}) { // 마진 안쓰고 중간에 무머 놓을 때
    let width;
    if(typeof w === 'number') {
        width = `${w}px`;
    } else {
        width = w;
    }
    let height;
    if(typeof h === 'number') {
        height = `${h}px`;
    } else {
        height = h;
    }
    return(
      <div style={{display: 'flex', width: `${width}`, height: `${height}`}}>
          {props.children}
      </div>
    );
}

export default SizeBox;