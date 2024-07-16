import SizeInfo from '@/components/sizeInfo/sizeInfo';
import {ContentSection, HeaderSection, IntroSection} from '@/layout';
import '@/app/page.scss'
import Divider from '@/components/divider/divider';


export default function Home() {
    return (
        <main className="simple-resume__app">
            <SizeInfo />
            <section className="simple__resume__frame">
                <div className="simple__resume__frame__wrapper">
                    <HeaderSection />
                    <Divider margin={'24px 0 0 0'} />
                    <IntroSection />
                    <Divider />
                    <ContentSection />
                </div>
            </section>
        </main>
    )
}
