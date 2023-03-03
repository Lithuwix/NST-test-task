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

    const max = ((dataForSlider.maxData - dataForSlider.minData) * 12); // количество делений

    const yearsCount = (dataForSlider.maxData - dataForSlider.minData); // количество годов

    const minCount = ((dataForSlider.minCurrentData - dataForSlider.minData) * 12) + dataForSlider.minCurrentMonth - 1; // позиция левого кругляшка
    const maxCount = ((dataForSlider.maxCurrentData - dataForSlider.minData) * 12) + dataForSlider.maxCurrentMonth - 1; // позиция правого кругляшка

    const [value, setValue] = React.useState<number[]>([minCount, maxCount]); // позиции круглишков

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };  // прорисовка круглишков

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек']  // массив месяков

    const valueLabelFormat = (value: number) => {
        return `${months[value % 12]} ${dataForSlider.minData + Math.floor(value / 12)}`
    } // текст связанный с кругами

    let marks: any = []; // информация деления

    let temp: any = []

    for (let i = 0; i <= yearsCount; i++) {
        let tempEl = {
            value: i * 12,
            label: `${dataForSlider.minData + i}`
        }

        temp.push(tempEl)

        marks = temp
    }

    if (props.mode === 'months') {
        if (size * 0.8 < 37 * 11 * marks.length) {
            let temp_arr: any = [];

            temp_arr.push(marks[0])
            temp_arr.push(marks[marks.length - 1])

            marks = [...temp_arr]
        } else {
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
    }

    if (size * 0.8 < 37 * yearsCount && props.mode === 'years') {

        let temp_arr: any = [];

        let center;
        if (marks.length % 2 === 0) {
            center = Math.round(marks.length / 2)
        } else {
            center = Math.round(marks.length / 2) - 1
        }

        let beforeCenter;
        if (center % 2 === 0) {
            beforeCenter = center / 2;
        } else {
            beforeCenter = (center + 1) / 2
        }

        let afterCenter
        if (center % 2 !== 0) {
            afterCenter = center + ((center - 1) / 2)
        } else {
            afterCenter = center + (center / 2)
        }

        temp_arr.push(marks[0])
        temp_arr.push(marks[beforeCenter])
        temp_arr.push(marks[center])
        temp_arr.push(marks[afterCenter])
        temp_arr.push(marks[marks.length - 1])

        marks = [...temp_arr]
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