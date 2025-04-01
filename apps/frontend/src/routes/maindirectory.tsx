import {Floor22_1} from "../components/directorypages/22floor1.tsx";
import {Floor22_2} from "../components/directorypages/22floor2.tsx";
import {Floor22_3} from "../components/directorypages/22floor3.tsx";
import {Floor22_4} from "../components/directorypages/22floor4.tsx";
import TwentyFloorOne from "../components/directorypages/20Floor1.tsx";
import TwentyFloorTwo from "../components/directorypages/20Floor2.tsx";
import TwentyFloorThree from "../components/directorypages/20Floor3.tsx";
import TwentyFloorFour from "../components/directorypages/20Floor4.tsx";

export function Directory() {
    return (
        <div className={"directory"}>
            <table>
                <tr>
                    <th>20 Patriot</th>
                    <th>22 Patriot</th>
                </tr>
                <tr>
                    <td><TwentyFloorOne /></td>
                    <td><Floor22_1 /></td>
                </tr>
                <tr>
                    <td><TwentyFloorTwo /></td>
                    <td><Floor22_2 /></td>
                </tr>
                <tr>
                    <td><TwentyFloorThree /></td>
                    <td><Floor22_3 /></td>
                </tr>
                <tr>
                    <td><TwentyFloorFour /></td>
                    <td><Floor22_4 /></td>
                </tr>
            </table>
        </div>
    )
}

export default Directory;