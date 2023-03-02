import React, {Dispatch, SetStateAction} from 'react';

import s from './Switcher.module.css';

type SwitcherPropsType = {
    setSliderMode: Dispatch<SetStateAction<"years" | "months">>
    sliderMode: 'years' | 'months'
}

export const Switcher = (props: SwitcherPropsType) => {
    return (
        <div className={s.wrapper}>
            <div
                className={`${s.switch} ${props.sliderMode === 'years' ? s.active_switch : ''}`}
                onClick={() => {
                    props.setSliderMode('years')
                }}
            >
                Все года
            </div>
            <div
                className={`${s.switch} ${props.sliderMode === 'months' ? s.active_switch : ''}`}
                onClick={() => {
                    props.setSliderMode('months')
                }}
            >
                Месяца
            </div>
        </div>
    );
};