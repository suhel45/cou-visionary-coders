type GardianInfo = {
  aliveStatus: boolean;
  profession: string;
};

export type FamilyInfo = {
  father: GardianInfo;
  mother: GardianInfo;
  siblings: {
    brotherInfo: string;

    sisterInfo: string;

    aboutSiblings: string;
  };
  financialStatus: string;
};
