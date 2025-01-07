export interface IWorkshop {
    name: string;
    category: string;
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    time: string;
    location: {
        address: string;
        city: string;
        state: string;
    };
    modes:{
        inPerson: boolean;
        online: boolean;
    };
    imageUrl: string;
}

export interface ILocation {
    address: string;
    city: string;
    state: string;
}