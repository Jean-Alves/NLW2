import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string;
}
//...rest pega todos os atributos restantes, ou seja, 
//da classe InputHTMLAttributes e joga na variavel rest
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {

    return (

        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}


export default Input;

