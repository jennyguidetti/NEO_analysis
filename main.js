// NEO JSON Analysis

// Step 1: Loading JSON data:
// File can be read into a variable using the following code:
const fs = require('fs');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

// Parse this into a JavaScript object so it can be used for other tasks
// Capsule the data in a function so it is not accesible as a global variable
function neowise(data) {
    return JSON.parse(data);
}

// Step 2: Basic functions
// Function that retrieves NEO data by the index
function findNeoByIndex(index) {
    const neos = neowise(data);
    if (index >= 0 && index < neos.length) {
        console.log(neos[index]);
        return neos[index];
    } else {
        console.log("The index is out of range"); 
        return "The index is out of range";
    }
} 
findNeoByIndex(7);
findNeoByIndex(500);

// Function which returns collection of NEOs according to class
//const apolloNeo = neowise.filter (function which will select whether the object is class apollo or not)
function filterByOrbitClass(className) {
    const filteredNeos = neowise(data).filter (function(neo) {
        return neo.orbit_class === className || neo.orbit_class === `${className}*`;
    })
    return filteredNeos;
}

// Function that returns collection of NEOs which are PHAs
//const phaNeos = neowise.filter (function that filters based on the value of the pha, when the phas field is true it will get extracted)
function filterByPha(pha) {
    const phaNeos = neowise(data).filter (function(neo) {
        return neo.pha === pha;
    })
    return phaNeos;
}
const phaNeos = filterByPha(true);
const nonPhaNeos = filterByPha(false);

// Function that returns NEO based on designation
function findNeoByDesignation(designation) {
    const neos = neowise(data);
    for (let i = 0; i < neos.length; i++) {
        if (neos[i].designation === designation) {
            console.log(neos[i]);
            return neos[i];
        } else {
            console.log("Unable to find NEO");
            return "Unable to find NEO"; 
        }
    }            
}

findNeoByDesignation("419880 (2011 AH37)");
findNeoByDesignation("not real");

// Use console.table to display results of functions already created
console.table(findNeoByIndex(7));
console.table(phaNeos);
console.table(findNeoByDesignation("419880 (2011 AH37)"));

// Step 3: Analysis
// Display information on all of the NEOs in the dataset
function displayAllNeos() {
    const neos = neowise(data);
    if (neos.length > 0) {
        for (let i = 0; i < neos.length; i++) {
            console.log(`NEO ${i}:`);
            console.log(neos[i]);
            console.log("");
        }
        return neos; // Return the array of NEOs
    }    
}
const allNeos = displayAllNeos();
console.table(allNeos); // Display the information in a table

// Display information on NEOs that have certain criteria
// NEOs that are a PHA:
console.table(phaNeos);

// NEOs that are a non-PHA:
console.table(nonPhaNeos);

// NEOs that are Apollo Asteroids
const apolloNeos = filterByOrbitClass("Apollo");
console.table(apolloNeos);

// NEOs that are Aten asteroids
const atenNeos = filterByOrbitClass("Aten");
console.table(atenNeos);

// NEOs that are Amor asteroids
const amorNeos = filterByOrbitClass("Amor");
console.table(amorNeos);

// NEOs that are Encke-type Comets
const enckeNeos = filterByOrbitClass("Encke-type Comet");
console.table(enckeNeos);

// NEOs that are Jupiter-family Comets
const jupiterNeos = filterByOrbitClass("Jupiter-family Comet");
console.table(jupiterNeos);

// NEOs that are Halley-type Comets
const halleyNeos = filterByOrbitClass("Halley-type Comet");
console.table(halleyNeos);

// NEOs that are Parabolic Comets
const parabolicNeos = filterByOrbitClass("Parabolic Comet");
console.table(parabolicNeos);

// NEOs that are Comets
const cometNeos = filterByOrbitClass("Comet");
console.table(cometNeos);

// NEOs that are PHA and a certain class
function filterByPhaAndOrbitClass(pha, className) { // Function that returns filter of the combination of pha and class
    const filteredNeos = neowise(data).filter(function(neo) {
        return neo.pha === pha && (neo.orbit_class === className || neo.orbit_class === `${className}*`);
    });
    return filteredNeos;
}
// NEOs that are PHA and Apollo
const phaApollos = filterByPhaAndOrbitClass(true, "Apollo");
console.table(phaApollos);

// nonPHA and Apollo
const nonPhaApollos = filterByPhaAndOrbitClass(false, "Apollo");
console.table(nonPhaApollos);

// PHA and Aten
const phaAtens = filterByPhaAndOrbitClass(true, "Aten");
console.table(phaAtens);

// nonPHA and Aten
const nonPhaAtens = filterByPhaAndOrbitClass(false, "Aten");
console.table(nonPhaAtens);

// PHA and Amor
const phaAmors = filterByPhaAndOrbitClass(true, "Amor");
console.table(phaAmors);

// nonPHA and Amor
const nonPhaAmors = filterByPhaAndOrbitClass(false, "Amor");
console.table(nonPhaAmors);

// Measure the maximum, minumum and averages values for the orbits of NEOs in a certain class or PHA
// Iterate through all these values for all PHAs and find the max, min and average values

// The function should return all orbit numerical values - h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg
const propertyNames = ["h_mag", "moid_au", "q_au_1", "q_au_2", "period_yr", "i_deg"];

// Function that returns arrays of property values for PHAs
function extractPhaPropertyValues(pha, propertyNames) { 
    const propertyValues = [];

    for (let i = 0; i < pha.length; i++) {
        propertyValues[i] = {};
        for (let j = 0; j < propertyNames.length; j++) {
            propertyValues[i][propertyNames[j]] = pha[i][propertyNames[j]];
        }
    }
    return propertyValues;
}

const phaPropertyValues = extractPhaPropertyValues(phaNeos, propertyNames);
console.table(phaPropertyValues);
const nonPhaPropertyValues = extractPhaPropertyValues(nonPhaNeos, propertyNames);
console.table(nonPhaPropertyValues);

// Function to calculate max, min and avg values
function calculateStats(values) { 

    const maxs = {};
    const mins = {};
    const totals = {};
    const avgs = {};

    for (const value of values) {
        
        for (const propertyName of propertyNames) {
            // Calculate Max
            let currMax = maxs[propertyName] || 0;
            let currValue = value[propertyName];
            if (currValue > currMax) {
                maxs[propertyName] = currValue;
            }

            // Calculate Min
            let currMin = mins[propertyName] || Infinity;
            if (currValue < currMin) {
                mins[propertyName] = currValue;
            }

            // Add to total
            let currTotal = totals[propertyName] || 0;
            totals[propertyName] = currTotal + currValue;

            avgs[propertyName] = totals[propertyName] / values.length; 
        }
    }
   console.log('Maximum:')
   console.table(maxs)
   console.log('Minimum:')
   console.table(mins)
   console.log('Average:')
   console.table(avgs)
   return {maxs, mins, avgs}; 
}

// Display the orbit stat results for PHAs + nonPHAs
const phaOrbits = calculateStats(phaPropertyValues); // This returns the PHA orbit stats
const nonPhaOrbits = calculateStats(nonPhaPropertyValues);

// For all Neos
const allPropertyValues = extractClassPropertyValues(allNeos, propertyNames);
const allOrbits = calculateStats(allPropertyValues);

// For different classes 
function extractClassPropertyValues(className, propertyNames) { // Function that returns arrays of property values for certain class
    const propertyValues = [];
    for (let i = 0; i < className.length; i++) {
        propertyValues[i] = {};
        for (let j = 0; j < propertyNames.length; j++) {
            propertyValues[i][propertyNames[j]] = className[i][propertyNames[j]];
        }
    }
    return propertyValues;
}

// Apollo Asteroids Stats
const apolloPropertyValues = extractClassPropertyValues(apolloNeos, propertyNames);
const apolloOrbits = calculateStats(apolloPropertyValues);

// Aten asteroids stats
const atenPropertyValues = extractClassPropertyValues(atenNeos, propertyNames);
const atenOrbits = calculateStats(atenPropertyValues);

// Amor asteroids stats
const amorPropertyValues = extractClassPropertyValues(amorNeos, propertyNames);
const amorOrbits = calculateStats(amorPropertyValues);

// Encke-type Comets stats
const enckePropertyValues = extractClassPropertyValues(enckeNeos, propertyNames);
const enckeOrbits = calculateStats(enckePropertyValues);

// NEOs that are Jupiter-family Comets
const jupiterPropertyValues = extractClassPropertyValues(jupiterNeos, propertyNames);
const jupiterOrbits = calculateStats(jupiterPropertyValues);

// NEOs that are Halley-type Comets
const halleyPropertyValues = extractClassPropertyValues(halleyNeos, propertyNames);
const halleyOrbits = calculateStats(halleyPropertyValues);

// NEOs that are Parabolic Comets
const parabolicPropertyValues = extractClassPropertyValues(parabolicNeos, propertyNames);
const parabolicOrbits = calculateStats(parabolicPropertyValues);

// NEOs that are Comets
const cometPropertyValues = extractClassPropertyValues(cometNeos, propertyNames);
const cometOrbits = calculateStats(cometPropertyValues);

// PHA + Apollo 
const phaApolloPropertyValues = extractClassPropertyValues(phaApollos, propertyNames);
const phaApolloOrbits = calculateStats(phaApolloPropertyValues);

// nonPHA and Apollo
const nonPhaApollosPropertyValues = extractClassPropertyValues(nonPhaApollos, propertyNames);
const nonPhaApollosOrbits = calculateStats(nonPhaApollosPropertyValues);

// PHA and Aten
const phaAtensApollosPropertyValues = extractClassPropertyValues(phaAtens, propertyNames);
const phaAtensOrbits = calculateStats(phaAtensApollosPropertyValues);

// nonPHA and Aten
const nonPhaAtensPropertyValues = extractClassPropertyValues(nonPhaAtens, propertyNames);
const nonPhaAtensOrbits = calculateStats(nonPhaAtensPropertyValues);

// PHA and Amor
const phaAmorsPropertyValues = extractClassPropertyValues(phaAmors, propertyNames);
const phaAmorsOrbits = calculateStats(phaAmorsPropertyValues);

// nonPHA and Amor
const nonPhaAmorsPropertyValues = extractClassPropertyValues(nonPhaAmors, propertyNames);
const nonPhaAmorsOrbits = calculateStats(nonPhaAmorsPropertyValues);

// Step 4: Changing JSON format
// Rearrange data into arrays based on NEO class
function returnClassArrays () {
    const apolloNeos = filterByOrbitClass("Apollo");
    const atenNeos = filterByOrbitClass("Aten");
    const amorNeos = filterByOrbitClass("Amor");
    const enckeNeos = filterByOrbitClass("Encke-type Comet");
    const jupiterNeos = filterByOrbitClass("Jupiter-family Comet");
    const halleyNeos = filterByOrbitClass("Halley-type Comet");
    const parabolicNeos = filterByOrbitClass("Parabolic Comet");
    const cometNeos = filterByOrbitClass("Comet");
    return {
        apolloNeos: apolloNeos,
        atenNeos: atenNeos,
        amorNeos: amorNeos,
        enckeNeos: enckeNeos,
        jupiterNeos: jupiterNeos,
        halleyNeos: halleyNeos,
        parabolicNeos: parabolicNeos,
        cometNeos: cometNeos,
    }
}

const newJson = returnClassArrays();

// Convert object into a JSON string
const jsonString = JSON.stringify(newJson)

// Save this data into a new file
fs.writeFileSync("NEOWISE_classes.json", jsonString); // New file needs to be manually reformated using (option + shift + F) on mac

// Step 5: Unit Tests
module.exports = {findNeoByIndex, findNeoByDesignation, extractClassPropertyValues, calculateStats};

