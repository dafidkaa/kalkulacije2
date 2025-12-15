export interface EVModel {
    id: string;
    brand: string;
    model: string;
    variant: string;
    batteryUsable: number; // kWh
}

export interface TariffModel {
    id: 'bijeli' | 'plavi';
    name: string;
    type: 'dual' | 'single';
    defaultPriceHigh: number; // EUR/kWh
    defaultPriceLow: number;  // EUR/kWh (only for dual, same as high for single)
}

export const CAR_BRANDS = [
    'Tesla',
    'Volkswagen',
    'Renault',
    'Hyundai',
    'Kia',
    'Audi',
    'Škoda',
    'BMW',
    'Dacia',
    'MG',
    'Porsche',
    'Mercedes-Benz',
    'Peugeot',
    'Ostalo / Ručni unos'
] as const;

export const POPULAR_EVS: EVModel[] = [
    // Tesla
    { id: 'tesla-3-rwd', brand: 'Tesla', model: 'Model 3', variant: 'RWD (Standard Range)', batteryUsable: 57.5 },
    { id: 'tesla-3-lr', brand: 'Tesla', model: 'Model 3', variant: 'Long Range', batteryUsable: 75.0 },
    { id: 'tesla-3-perf', brand: 'Tesla', model: 'Model 3', variant: 'Performance', batteryUsable: 76.0 },
    { id: 'tesla-y-rwd', brand: 'Tesla', model: 'Model Y', variant: 'RWD', batteryUsable: 57.5 },
    { id: 'tesla-y-lr', brand: 'Tesla', model: 'Model Y', variant: 'Long Range', batteryUsable: 75.0 },

    // VW
    { id: 'vw-id3-58', brand: 'Volkswagen', model: 'ID.3', variant: 'Pro (58 kWh)', batteryUsable: 58.0 },
    { id: 'vw-id3-77', brand: 'Volkswagen', model: 'ID.3', variant: 'Pro S (77 kWh)', batteryUsable: 77.0 },
    { id: 'vw-id4-52', brand: 'Volkswagen', model: 'ID.4', variant: 'Pure (52 kWh)', batteryUsable: 52.0 },
    { id: 'vw-id4-77', brand: 'Volkswagen', model: 'ID.4', variant: 'Pro (77 kWh)', batteryUsable: 77.0 },

    // Renault & Dacia
    { id: 'renault-zoe-50', brand: 'Renault', model: 'Zoe', variant: 'ZE50', batteryUsable: 52.0 },
    { id: 'renault-megane-40', brand: 'Renault', model: 'Megane E-Tech', variant: 'EV40', batteryUsable: 40.0 },
    { id: 'renault-megane-60', brand: 'Renault', model: 'Megane E-Tech', variant: 'EV60', batteryUsable: 60.0 },
    { id: 'renault-twingo', brand: 'Renault', model: 'Twingo', variant: 'Electric', batteryUsable: 21.3 },
    { id: 'dacia-spring', brand: 'Dacia', model: 'Spring', variant: 'Electric', batteryUsable: 25.0 },

    // Hyundai & Kia
    { id: 'hyundai-kona-39', brand: 'Hyundai', model: 'Kona', variant: '39 kWh', batteryUsable: 39.2 },
    { id: 'hyundai-kona-64', brand: 'Hyundai', model: 'Kona', variant: '64 kWh', batteryUsable: 64.0 },
    { id: 'hyundai-ioniq5-58', brand: 'Hyundai', model: 'IONIQ 5', variant: '58 kWh', batteryUsable: 54.0 },
    { id: 'hyundai-ioniq5-73', brand: 'Hyundai', model: 'IONIQ 5', variant: '72.6 kWh', batteryUsable: 70.0 },
    { id: 'hyundai-ioniq5-77', brand: 'Hyundai', model: 'IONIQ 5', variant: '77.4 kWh', batteryUsable: 74.0 },
    { id: 'kia-niro-64', brand: 'Kia', model: 'e-Niro', variant: '64 kWh', batteryUsable: 64.0 },
    { id: 'kia-ev6-58', brand: 'Kia', model: 'EV6', variant: 'Standard Range', batteryUsable: 54.0 },
    { id: 'kia-ev6-77', brand: 'Kia', model: 'EV6', variant: 'Long Range', batteryUsable: 74.0 },

    // Skoda & Audi
    { id: 'skoda-enyaq-60', brand: 'Škoda', model: 'Enyaq iV', variant: '60', batteryUsable: 58.0 },
    { id: 'skoda-enyaq-80', brand: 'Škoda', model: 'Enyaq iV', variant: '80', batteryUsable: 77.0 },
    { id: 'audi-q4-35', brand: 'Audi', model: 'Q4 e-tron', variant: '35', batteryUsable: 52.0 },
    { id: 'audi-q4-40', brand: 'Audi', model: 'Q4 e-tron', variant: '40', batteryUsable: 76.6 },

    // MG
    { id: 'mg-4-51', brand: 'MG', model: 'MG4', variant: 'Standard Range', batteryUsable: 50.8 },
    { id: 'mg-4-64', brand: 'MG', model: 'MG4', variant: 'Long Range', batteryUsable: 61.7 },
    { id: 'mg-zs-ev', brand: 'MG', model: 'ZS EV', variant: 'Long Range', batteryUsable: 68.3 },

    // Others
    { id: 'custom', brand: 'Ostalo / Ručni unos', model: 'Ručni unos', variant: 'Upišite kapacitet', batteryUsable: 0 },
];

export const TARIFFS: TariffModel[] = [
    {
        id: 'bijeli',
        name: 'Bijeli (Dvotarifni)',
        type: 'dual',
        defaultPriceHigh: 0.169, // Effective price Nov 2024 (Energy + Grid + Fees + VAT)
        defaultPriceLow: 0.087   // Effective price Nov 2024
    },
    {
        id: 'plavi',
        name: 'Plavi (Jednotarifni)',
        type: 'single',
        defaultPriceHigh: 0.150, // Approx blended rate or slightly lower than VT
        defaultPriceLow: 0.150
    }
];

export const EV_HINTS = {
    tips: [
        "Punjenjem noću (21h-07h zimi / 22h-08h ljeti) možete uštedjeti i do 50% cijene struje.",
        "Bateriju je najbolje držati između 20% i 80% za dugotrajnost.",
        "Zimi domet može pasti za 10-30% zbog grijanja i hladne baterije."
    ]
};
