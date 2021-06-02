import { useMemo } from "react";

const Name = ({ sender }) => {
    // Memomized value ...
    const color = useMemo(() => ["red", "green", "blue", "white", "#CCFF00", "#AAF0D1", "#FF00CC", "#FFF700", "#A83731", "#FF7A00",
     "#85754E", "#FF3399", "#A0E6FF", "#ABAD48", "#8E3179", "#D9E650", "#FBE7B2"], []);

    const randomGen = list => Math.floor(Math.random() * list.length);
    // Memomized random number based on the length of the color array...
    const randomNumber = useMemo(() => randomGen(color), [color])

    return (
        <span style={ {color: color[randomNumber], fontWeight: 'bold'}}> 
        {/* <span style={ {color: color[useCallback(randomGen(color), [color])], fontWeight: 'bold'}}>  */}
            { sender }
        </span>
    )
}

export default Name
