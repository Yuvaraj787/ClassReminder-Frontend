const slots = [
    { hour: 8, min: 30 },
    { hour: 9, min: 30 },
    { hour: 10, min: 30 },
    { hour: 11, min: 25 },
    { hour: 13, min: 10 },
    { hour: 14, min: 0 },
    { hour: 15, min: 55 },
    { hour: 16, min: 0 },
    { hour: 16, min: 50 }
];

const timeToHour = (hh, mm) => {
    if ((hh < 8) || (hh === 8 && mm < 30)) return 0; // Before the first slot
    for (let i = 0; i < slots.length - 1; i++) {
        const curSl = slots[i];
        const nextSl = slots[i + 1];

        // Current hour and minute is between curSl and nextSl
        if ((curSl.hour < hh || (curSl.hour === hh && curSl.min <= mm)) && 
            (hh < nextSl.hour || (hh === nextSl.hour && mm < nextSl.min))) {
            return i + 1;
        }
    }

    // Check if the time is after the last slot
    const lastSlot = slots[slots.length - 1];
    if (hh > lastSlot.hour || (hh === lastSlot.hour && mm >= lastSlot.min)) {
        return slots.length;
    }

    return slots.length + 1; // Default return value if the time does not fit any slot
};

export default timeToHour;