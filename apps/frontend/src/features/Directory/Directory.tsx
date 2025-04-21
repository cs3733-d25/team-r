import React from "react";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {allSpecialties} from '@/features/Directory/specialties.ts';
import {GroupedList, ListGroup, ListItem} from '@/features/Directory/listTypes.ts';

const groupAndSortSpecialties = (specialties: string[]): GroupedList => {
    // Sort the specialties alphabetically
    const sortedSpecialties = [...specialties].sort();

    const groupedData: { [key: string]: ListItem[] } = {};

    // Group by the first letter
    sortedSpecialties.forEach(specialty => {
        const firstLetter = specialty.charAt(0).toUpperCase();
        if (!groupedData[firstLetter]) {
            groupedData[firstLetter] = [];
        }
        groupedData[firstLetter].push({ name: specialty });
    });

    // Convert the grouped object into an array of ListGroup
    const groupedList: GroupedList = Object.keys(groupedData)
        .sort() // Sort the letters alphabetically
        .map(letter => ({
            letter: letter,
            items: groupedData[letter],
        }));

    return groupedList;
};


export function Directory() {
    const groupedSpecialties = groupAndSortSpecialties(allSpecialties);

    return (
        <>
            <NavbarMGH />
            <div className="container mx-auto px-4 py-8"> {/* Use a container for better centering and padding */}
                <h1 className="text-4xl font-bold text-center mb-8">Medical Specialties Directory</h1> {/* Add a title */}
                <div className="flex flex-col md:flex-row md:gap-8"> {/* Flex container for columns on medium screens and up */}
                    {groupedSpecialties.map(group => (
                        <div key={group.letter} className="w-full md:w-1/3 mb-8"> {/* Each group takes full width on small, 1/3 on medium+ */}
                            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">{group.letter}</h2>
                            <ul>
                                {group.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="mb-1">
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Directory;
