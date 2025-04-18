import { Floor22_1 } from './directorypages/22floor1.tsx';
import { Floor22_2 } from './directorypages/22floor2.tsx';
import { Floor22_3 } from './directorypages/22floor3.tsx';
import { Floor22_4 } from './directorypages/22floor4.tsx';
import TwentyFloorOne from './directorypages/20Floor1.tsx';
import TwentyFloorTwo from './directorypages/20Floor2.tsx';
import TwentyFloorThree from './directorypages/20Floor3.tsx';
import TwentyFloorFour from './directorypages/20Floor4.tsx';
import Navbar from "../../components/Navbar.tsx";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";

export function Directory() {
    return (
        <>
            <NavbarMGH/>
            <div className={'flex min-h-screen justify-center'}>
                <br/>
                <table className={'text-l'}>
                    <tbody>
                    <tr className={'border-b'}>
                        <th className={'text-4xl text-center pt-5'}>20 Patriot</th>
                        <th className={'text-4xl text-center pt-5'}>22 Patriot</th>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r text-left align-top pr-5'}>
                            <TwentyFloorOne />
                        </td>
                        <td className={'text-left border-r align-top pl-5 pr-5'}>
                            <Floor22_1 />
                        </td>
                        <td className={' text-center text-2xl pl-5'}>Floor 1</td>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r text-left align-top pr-5'}>
                            <TwentyFloorTwo />
                        </td>
                        <td className={'text-left border-r align-top pl-5 pr-5'}>
                            <Floor22_2 />
                        </td>
                        <td className={' text-center text-2xl pl-5'}>Floor 2</td>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r text-left align-top pr-5'}>
                            <TwentyFloorThree />
                        </td>
                        <td className={'text-left border-r align-top pl-5 pr-5'}>
                            <Floor22_3 />
                        </td>
                        <td className={' text-center text-2xl pl-5'}>Floor 3</td>
                    </tr>
                    <tr>
                        <td className={'border-r align-top text-left pr-5'}>
                            <TwentyFloorFour />
                        </td>
                        <td className={'text-left border-r align-top pl-5 pr-5'}>
                            <Floor22_4 />
                        </td>
                        <td className={' text-center text-2xl pl-5'}>Floor 4</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Directory;
