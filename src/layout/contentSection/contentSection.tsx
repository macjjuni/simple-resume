'use client';

import {memo, useState} from 'react';
import {SubTitle} from '@/components/input';
import ContentBodyLeft from '@/layout/contentSection/contentBodyLeft';
import './contentSection.scss';
import ContentBodyRight from '@/layout/contentSection/contentBodyRight';

function ContentSection() {


    return (
        <section className={'simple-resume__content__container'}>
            <ContentBodyLeft/>
            <ContentBodyRight/>
        </section>
    );
};

export default memo(ContentSection);
