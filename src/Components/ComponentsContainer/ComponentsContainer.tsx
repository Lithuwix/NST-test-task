import React, {useState} from 'react';

import s from './ComponentsContainer.module.css'

import {MySlider} from "./MySlider/MySlider";
import {Switcher} from "./Switcher/Switcher";

export const ComponentsContainer = () => {

    const [sliderMode, setSliderMode] = useState<'years' | 'months'>('years')

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Switcher sliderMode={sliderMode} setSliderMode={setSliderMode}/>
                <div>
                    {sliderMode === 'years' &&
                        <div>
                            <MySlider
                                mode='years'
                                minData='1/2014'
                                maxData='1/2021'
                                minCurrentData='5/2015'
                                maxCurrentData='9/2017'
                            />
                        </div>
                    }
                    {sliderMode === 'months' &&
                        <div>
                            <MySlider
                                mode='months'
                                minData='1/2015'
                                maxData='1/2017'
                                minCurrentData='5/2015'
                                maxCurrentData='2/2016'
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

