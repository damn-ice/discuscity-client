import { useCallback } from "react";

const Name = ({sender}) => {

    // A better way to implement this is to get the random number or number...
    // ... from db based on calculation
    const color = ["red", "green", "blue", "white", "#CCFF00", "#AAF0D1", "#FF00CC", "#FFF700", "#A83731", "#FF7A00",
     "#85754E", "#FF3399", "#A0E6FF", "#ABAD48", "#8E3179", "#D9E650", "#FBE7B2"];

    const randomGen =  list => Math.floor(Math.random() * list.length);

    return (
        <span style={ {color: color[useCallback(randomGen(color), [])], fontWeight: 'bold'}}> 
            {sender}
        </span>
    )
}

export default Name
