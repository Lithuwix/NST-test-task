import React, {useState} from 'react';

import "./MySlider.css";

import Slider from '@mui/material/Slider';

type MySliderPropsType = {
    minData: string
    maxData: string
    minCurrentData: string
    maxCurrentData: string
    mode: 'years' | 'months'
}

export function MySlider(props: MySliderPropsType) {

    const [size, setSize] = useState(window.innerWidth)

    React.useEffect(() => {
        function handleResize() {
            setSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [window.innerWidth])

    const dataForSlider = {
        minData: Number(props.minData.split('/')[1]),
        minCurrentData: Number(props.minCurrentData.split('/')[1]),
        minCurrentMonth: Number(props.minCurrentData.split('/')[0]),
        maxData: Number(props.maxData.split('/')[1]),
        maxCurrentData: Number(props.maxCurrentData.split('/')[1]),
        maxCurrentMonth: Number(props.maxCurrentData.split('/')[0])
    }

    const max = ((dataForSlider.maxData - dataForSlider.minData) * 12);

    const maxYear = (dataForSlider.maxData - dataForSlider.minData);

    const minCount = ((dataForSlider.minCurrentData - dataForSlider.minData) * 12) + dataForSlider.minCurrentMonth - 1;
    const maxCount = ((dataForSlider.maxCurrentData - dataForSlider.minData) * 12) + dataForSlider.maxCurrentMonth - 1;

    const [value, setValue] = React.useState<number[]>([minCount, maxCount]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const valueLabelFormat = (value1: number) => {
        if (value1 % 12 === 0) {
            return `январь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 1) {
            return `февраль ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 2) {
            return `март ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 3) {
            return `апрель ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 4) {
            return `май ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 5) {
            return `июнь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 6) {
            return `июль ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 7) {
            return `август ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 8) {
            return `сентябрь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 9) {
            return `октябрь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 10) {
            return `ноябрь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
        if (value1 % 12 === 11) {
            return `декабрь ${dataForSlider.minData + Math.floor(value1 / 12)}`
        }
    }

    let marks = [
        {
            value: 0,
            label: props.minData.split('/')[1],
        }
    ];


    for (let i = 0; i <= maxYear; i++) {
        let temp = {
            value: 12 * i,
            label: `${dataForSlider.minData + i}`
        }
        marks = [...marks, temp]
    }


    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек']

    if (props.mode === 'months' && window.innerWidth > 900) {
        for (let i = 0; i <= max; i++) {
            if (i !== 0 && i % 12 !== 0) {
                let temp = {
                    value: i,
                    label: `${months[i % 12]}`
                }
                marks = [...marks, temp]
            }
        }
    }

    if (props.mode === 'months' && 530 < window.innerWidth && window.innerWidth < 900) {
        for (let i = 0; i <= max; i++) {
            if (i !== 0 && i % 12 !== 0 && i%2!==1) {
                let temp = {
                    value: i,
                    label: `${months[i % 12]}`
                }
                marks = [...marks, temp]
            }
        }
    }

    return (
        <div className='my-slider'>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                max={max}
                marks={marks}
                value={value}
                valueLabelDisplay="on"
                onChange={handleChange}
                valueLabelFormat={valueLabelFormat}
            />
        </div>
    );
}