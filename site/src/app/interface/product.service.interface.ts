export interface GetInfoInterface {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface GetCategoryInterface {
  name: string;
  value: string;
}

export interface FeacturesExistItemInterface {
  id: string;
  name: string;
  value: string;
  isEdit: boolean;
}
export interface FeacturesExistItemRequestInterface extends FeacturesExistItemInterface{
  uidFeactures: string;
}
