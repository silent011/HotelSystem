import React from 'react'

const Input = (props) => {
    let input = null
    if(props.textarea){
        input = (
            <textarea id={props.id} name={props.name}
            cols= {props.cols} rows={props.rows}
            onChange={props.inputChange}>{props.value}</textarea>
        )
    } else {
        input = <input type={props.type} id={props.id} name={props.name}
         value={props.value} onChange={props.inputChange} />
    }
    return (
        <div className="field-holder">
            <label htmlFor={props.id}>{props.name}:</label>
            { input }
        </div>
    )
}

export default Input