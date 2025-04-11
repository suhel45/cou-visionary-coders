type Address = {
  district: string;
  subdistrict: string;
  village: string;
};

export type AddressInfo = {
  permanentAddress: Address;
  presentAddress: Address;
};
