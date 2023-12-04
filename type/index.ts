export type AlcoholCheckInputs = {
  alcoholCheck1: string;
  alcoholCheck2: string;
  alcoholCheckValue: number;
};

export type AlcoholCheck = {
  id: string;
  alcoholCheck1: string;
  alcoholCheck2: string;
  alcoholCheckValue: number;
  date: string;
  uid: string;
  createdAt: any;
  updatedAt: any;
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
  daimaru: boolean;
  willfit: boolean;
};

export type Calendar = {
  imageWillfit: {
    url: string;
    width: number;
    height: number;
  };
  imageHonsha: {
    url: string;
    width: number;
    height: number;
  };
  imageTokushima: {
    url: string;
    width: number;
    height: number;
  };
  imageHonshaNext: {
    url: string;
    width: number;
    height: number;
  };
  imageTokushimaNext: {
    url: string;
    width: number;
    height: number;
  };
};

export type News = {
  id: string;
  postDate: string;
  title: string;
  content: string;
  createdAt: any;
  cratedBy: {
    ref: string;
  };
  images: {
    url: string;
    path: string;
    type: string;
    name: string;
  }[];
};

export type QuickAccessLink = {
  id: string;
  title: string;
  link: string;
  category: string;
  createBy: {
    ref: string;
  };
  createdAt: any;
};

export type ReadLog = {
  id: string;
  createdAt: any;
  createdBy: {
    ref: string;
  };
};
