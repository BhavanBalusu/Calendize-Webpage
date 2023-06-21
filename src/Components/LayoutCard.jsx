import React from 'react'
import "../Styles/Layout.css"

const LayoutCard = React.forwardRef(({ imgSrc, desc, additionalClass, layout, onClickFN }, ref) => {
    return (
        <div className={"layout-holder " + additionalClass} ref={ref} onClick={(e) => onClickFN(e, layout)}>
            <img src={imgSrc} className={layout.indexOf("V") === -1 ? "layout-image horiz" : "layout-image vert"} />
            <h3 className='layout-text'>{desc}</h3>
        </div>
    )
})

export default LayoutCard;

