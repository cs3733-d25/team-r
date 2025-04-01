

export function Floor22_4() {
    const displaydept = (dept: string) => {
        document.body.innerHTML = dept;
    };
    return (
        <div className={"floor-22-4"}>
            Floor 4:
            <ul>
                <li onClick={() => displaydept("Blood Draw/Phlebotomy")}>Blood Draw/Phlebotomy</li>
                <li onClick={() => displaydept("Community Room")}>Community Room</li>
                <li onClick={() => displaydept("Primary Care")}>Primary Care</li>
            </ul>
        </div>
    )
}