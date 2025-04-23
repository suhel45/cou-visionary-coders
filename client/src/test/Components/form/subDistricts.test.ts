import subDistricts from '../../../components/form/subDistricts'; // Adjust the import path accordingly

describe('subDistricts', () => {
  it('should be defined and not empty', () => {
    expect(subDistricts).toBeDefined();
    expect(Object.keys(subDistricts).length).toBeGreaterThan(0);
  });

  it('should contain the correct subdistricts for Bagerhat', () => {
    const bagerhatSubdistricts = subDistricts['Bagerhat'];
    expect(bagerhatSubdistricts).toBeDefined();
    expect(bagerhatSubdistricts.length).toBe(9);
    expect(bagerhatSubdistricts).toEqual(
      expect.arrayContaining([
        'Bagerhat Sadar',
        'Chitalmari',
        'Fakirhat',
        'Kachua',
        'Mollahat',
        'Mongla',
        'Morrelganj',
        'Rampal',
        'Sarankhola',
      ]),
    );
  });

  it('should contain specific subdistricts for Dhaka', () => {
    const dhakaSubdistricts = subDistricts['Dhaka'];
    expect(dhakaSubdistricts).toBeDefined();
    expect(dhakaSubdistricts).toContain('Gulshan');
    expect(dhakaSubdistricts).toContain('Motijheel');
    expect(dhakaSubdistricts.length).toBeGreaterThan(0);
  });

  it('should not contain any undefined subdistricts', () => {
    for (const division in subDistricts) {
      const subdistrictList =
        subDistricts[division as keyof typeof subDistricts];
      subdistrictList.forEach((subdistrict) => {
        expect(subdistrict).toBeDefined();
        expect(typeof subdistrict).toBe('string');
      });
    }
  });

  it('should return the correct number of subdistricts for each division', () => {
    // Example: Testing that some divisions have more than 5 subdistricts.
    const division = 'Rajshahi';
    const rajshahiSubdistricts = subDistricts[division];
    expect(rajshahiSubdistricts.length).toBeGreaterThan(5);
  });
});
