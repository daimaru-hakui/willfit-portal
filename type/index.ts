export type AlcoholCheckInputs = {
  alcoholCheck1: string;
  alcoholCheck2: string;
  alcoholCheckValue: number;
};

export type AlcoholCheck = {
  id: string;
  alcoholCheck1: string;
  alcoholCheck2: string;
  alcoholCheckValue:number;
  date: string;
  uid: string;
  createdAt: any;
  updatedAt:any;
};

export type User = {
    id: string;
    uid: string;
    name: string;
    rank: number;
    email: string;
    isoSalesStaff: boolean;
    isoBoss: boolean;
    isoManager: boolean;
    isoOffice: boolean;
    isoTopManegment: boolean;
    alcoholChecker: boolean;
    daimaru:boolean;
    willfit:boolean;
  };
