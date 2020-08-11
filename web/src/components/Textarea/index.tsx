import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string;
}
//...rest pega todos os atributos restantes, ou seja, 
//da classe InputHTMLAttributes e joga na variavel rest
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {

    return (

        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}


export default Textarea;

