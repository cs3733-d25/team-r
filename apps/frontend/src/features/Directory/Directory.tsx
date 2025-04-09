import { Floor22_1 } from './directorypages/22floor1.tsx';
import { Floor22_2 } from './directorypages/22floor2.tsx';
import { Floor22_3 } from './directorypages/22floor3.tsx';
import { Floor22_4 } from './directorypages/22floor4.tsx';
import TwentyFloorOne from './directorypages/20Floor1.tsx';
import TwentyFloorTwo from './directorypages/20Floor2.tsx';
import TwentyFloorThree from './directorypages/20Floor3.tsx';
import TwentyFloorFour from './directorypages/20Floor4.tsx';
import Navbar from "../../components/Navbar.tsx";

export function Directory() {
    return (
        <>
            <Navbar/>
            <div className={'flex min-h-screen justify-center bg-mgb-light-blue'}>
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
