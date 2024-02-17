const hostelZone = {
    latRange: [13.014649, 13.015258],
    longRange : [80.236928, 80.239602]
}

// const KpZone = {
//     latRange: [13.014649, 13.015258],
//     longRange : [80.236928, 80.239602]
// }

// const ITDepartmentZone = {
//     latRange: [13.014649, 13.015258],
//     longRange : [80.236928, 80.239602]
// }

// const RedBuildingZone = {
//     latRange: [13.014649, 13.015258],
//     longRange : [80.236928, 80.239602]
// }

const AnnaLibrary = {
    latRange: [13.010721, 13.010326],
    longRange: [80.237528, 80.238083]
}

const locations = {
    "CEG Hostel Zone" : hostelZone,
    // "KP" : KpZone,
    // "IT Department" : ITDepartmentZone,
    // "Red Building" : RedBuildingZone,
    "Anna Library" : AnnaLibrary
}


function isInrange(target, range) {
    return target >= range[0] && target <= range[1]; 
}

const giveCollegeLocation = (lattitude, longitude) => {

    console.log(lattitude, longitude)

    for (loc in locations) {
        zone = locations[loc]
        if (isInrange(lattitude, hostelZone.latRange) && isInrange(longitude, hostelZone.longRange)) {
            return loc;
        }
    }
    
    return "Outside Campus"
}

export { giveCollegeLocation }