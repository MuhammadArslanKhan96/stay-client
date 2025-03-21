// types.ts
export interface Room {
    id: number;
    idPmsExternal: string;
    name: string;
    propertyAddress: string;
    propertyDescription: string;
    propertyDescriptionComplement: string;
    zip: string;
    idCommunity: number;
    propertyName: string;
    mcPropertyName: string;
    zones: string[];
    imageSource: string;
    class: string;
    type: string;
    numberRooms: number;
    bathRooms: number;
    numberGuests: number;
    rateStars: number;
    reviews: number;
    status: string;
    statusDescription: string;
    originPMS: string;
    pricePerNightBase: number;
    pricePerNightAverage: number | null;
    propertyCurrency: string;
    latitude: number;
    longitude: number;
    city: string;
    destiny: string;
    state: string;
    country: string;
    idProvider: null;
    daysToCancelWithoutExtraTaxes: number;
    cancellationRules: string;
    price: {
        checkin: string;
        checkout: string;
        checkin00: string;
        checkout00: string;
        numberOfNightsPricesIncluded: number;
        numberOfNights: number;
        pricePerNightCalculated: number;
        allNightsHasPricesIncluded: boolean;
        rentalRate: number;
        cleaningFee: number;
        servicesValue: number;
        extraFees: number;
        subtotal: number;
        taxFee: number;
        total: number;
        servicesMandatory: any[];
        includedFees: any[];
        taxPercents: {
            tax1: number;
            tax2: number;
            tax3: number;
        };
        chargeTaxOnRentals: {
            chargeTax1: boolean;
            chargeTax2: boolean;
            chargeTax3: boolean;
        };
        chargeTaxOnPoolHeats: {
            chargeTax1: boolean;
            chargeTax2: boolean;
            chargeTax3: boolean;
        };
        chargeTaxOnBookingFees: {
            chargeTax1: boolean;
            chargeTax2: boolean;
            chargeTax3: boolean;
        };
        chargeTaxOnCleaningFees: {
            chargeTax1: boolean;
            chargeTax2: boolean;
            chargeTax3: boolean;
        };
        currencyDefault: string;
        currencyWished: string;
        ptax: number;
        minimumNightsToStay: number;
    };
    amenitiesList: string[];
    categoriesList: any[];
    progress: number;
}