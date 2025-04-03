export const displaydept = (dept: string) => {
    document.body.innerText = dept;
};

export function Floor22_4() {
    return (
        <div className={"floor-22-4"}>
            <ul>
                <li onClick={() => displaydept("Blood Draw/Phlebotomy")} className={"hover:bg-[#67d1f5]"}>Blood Draw/Phlebotomy</li>
                <li onClick={() => displaydept("Community Room")} className={"hover:bg-[#67d1f5]"}>Community Room</li>
                <li onClick={() => displaydept("Primary Care")} className={"hover:bg-[#67d1f5]"}>Primary Care</li>
            </ul>
        </div>
    )
}