const {findNeoByIndex, findNeoByDesignation, extractClassPropertyValues, calculateStats} = require('./main');

// Test Case 1.1
test('findNeoByIndex will find a NEO by the index', () => {
    const result = findNeoByIndex(0);
    expect(result.designation).toBe("419880 (2011 AH37)"); 
})     

// Test Case 1.2
test('findNeoByIndex will find a NEO by the index', () => {
    const result = findNeoByIndex(500);
    expect(result).toBe("The index is out of range");
})

// Test Case 2.1
test('findNeoByDesignation will find a NEO by the designation', () => {
    const result = findNeoByDesignation("419880 (2011 AH37)")
    const expected = {
        designation: '419880 (2011 AH37)',
        discovery_date: '2011-01-07T00:00:00.000',
        h_mag: 19.7,
        moid_au: 0.035,
        q_au_1: 0.84,
        q_au_2: 4.26,
        period_yr: 4.06,
        i_deg: 9.65,
        pha: true,
        orbit_class: 'Apollo'
      };
    expect(result).toEqual(expected);
})

// Test Case 2.2
test('findNeoByDesignation will find a NEO by the designation', () => {
    const result = findNeoByDesignation('(2025 NO000)')
    expect(result).toBe("Unable to find NEO");
})

// Test Case 3
test('extractClassPropertyValues will return the numerical property values of NEOs of a certain class', () => {
    const propertyNames = ["moid_au", "q_au_1"];
    const enckeNeos = [{
        designation: 'P/2010 B2 (WISE)',
        discovery_date: '2010-01-22T00:00:00.000',
        moid_au: 0.63,
        q_au_1: 1.62,
        q_au_2: 4.6,
        period_yr: 5.49,
        i_deg: 8.93,
        pha: null,
        orbit_class: 'Encke-type Comet'
      }];
    const expectedValues = [{"moid_au": 0.63, "q_au_1": 1.62,}];
    const result = extractClassPropertyValues(enckeNeos, propertyNames);
    expect(result).toEqual(expectedValues);
})

// Test Case 4
test('calculateStats will calculate the maximum, minimum and average of an array of numbers', () => {
    const propertyNames = ["moid_au", "q_au_1", "i_deg"];
    const parabolicPropertyValues = [
        { moid_au: 0.307, q_au_1: 1.09, i_deg: 162.3 },
        { moid_au: 1.546, q_au_1: 2.27, i_deg: 96.48 }
      ]
    const result = calculateStats(parabolicPropertyValues)
    const expected = {
        maxs: {moid_au: 1.546, q_au_1: 2.27, i_deg: 162.3},
        mins: {moid_au:0.307, q_au_1:1.09, i_deg: 96.48}
    };
    expect(result).toMatchObject(expected);
})

