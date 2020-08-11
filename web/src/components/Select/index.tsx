import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string
    label: string;
    options: Array<{
        value: string;
        label: string

    }>;
}
//...rest pega todos os atributos restantes, ou seja, 
//da classe InputHTMLAttributes e joga na variavel rest
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {

    return (

        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(op => {
                    return <option key={op.value} value={op.value}>{op.label}</option>
                })}
            </select>
        </div>
    );
}


export default Select;

