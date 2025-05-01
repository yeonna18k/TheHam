export interface State {
    category : string,
    totalAmount: number,
}

export interface StateCategory {
    items: never;
    id : number,
    title: string, 
    category: string, 
    amount: number,
    updatedAt: Date,
    memo: string,
    endDate: Date,
    repeat: Repeat   
}

export interface Repeat {
    frequency: string,
    month: number, 
    day: number,
}


export interface ConsumeCategory {
    change: number;
    consume: number;
}

export type Category = {
    name: string;
    value: number;
    color: string;
  };
  

