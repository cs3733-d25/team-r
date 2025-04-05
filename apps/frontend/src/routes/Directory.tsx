import { Floor22_1 } from '../components/directorypages/22floor1.tsx';
import { Floor22_2 } from '../components/directorypages/22floor2.tsx';
import { Floor22_3 } from '../components/directorypages/22floor3.tsx';
import { Floor22_4 } from '../components/directorypages/22floor4.tsx';
import TwentyFloorOne from '../components/directorypages/20Floor1.tsx';
import TwentyFloorTwo from '../components/directorypages/20Floor2.tsx';
import TwentyFloorThree from '../components/directorypages/20Floor3.tsx';
import TwentyFloorFour from '../components/directorypages/20Floor4.tsx';
import Navbar from "../components/Navbar.tsx";

export function Directory() {
    return (
        <>
            <Navbar/>
            <div className={'flex min-h-screen justify-center bg-[#b8e4e4]'}>
                <table className={'text-2xl font-bold'}>
                    <tbody>
                    <tr className={'border-b'}>
                        <th className={'text-6xl border-r pr-10'}>20 Patriot</th>
                        <th className={'text-6xl pl-10'}>22 Patriot</th>
                    </tr>
                    <tr>
                        <td className={'text-3xl text-right'}>Floor</td>
                        <td>
                            <h2 className={'text-3xl text-left pl-2'}>1</h2>
                        </td>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r align-top pr-10'}>
                            <TwentyFloorOne />
                        </td>
                        <td className={'text-right align-top pl-10'}>
                            <Floor22_1 />
                        </td>
                    </tr>
                    <tr>
                        <td className={'text-3xl text-right'}>Floor</td>
                        <td>
                            <h2 className={'text-3xl text-left pl-2'}>2</h2>
                        </td>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r align-top pr-10'}>
                            <TwentyFloorTwo />
                        </td>
                        <td className={'text-right align-top pl-10'}>
                            <Floor22_2 />
                        </td>
                    </tr>
                    <tr>
                        <td className={'text-3xl text-right'}>Floor</td>
                        <td>
                            <h2 className={'text-3xl text-left pl-2'}>3</h2>
                        </td>
                    </tr>
                    <tr className={'border-b'}>
                        <td className={'border-r align-top pr-10'}>
                            <TwentyFloorThree />
                        </td>
                        <td className={'text-right align-top pl-10'}>
                            <Floor22_3 />
                        </td>
                    </tr>
                    <tr>
                        <td className={'text-3xl text-right'}>Floor</td>
                        <td>
                            <h2 className={'text-3xl text-left pl-2'}>4</h2>
                        </td>
                    </tr>
                    <tr>
                        <td className={'border-r align-top pr-10'}>
                            <TwentyFloorFour />
                        </td>
                        <td className={'text-right align-top pl-10'}>
                            <Floor22_4 />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Directory;
