export type FinanceType = 'CASH' | 'LOAN' | 'INSTALLMENTS';
export type AssetType = 'CAR' | 'GENERAL' | 'HOUSE';

export interface Verdict {
    score: number; // 0-100 (100 is best)
    label: 'Safe' | 'Stretch' | 'Risky' | 'Critical';
    color: 'green' | 'yellow' | 'red' | 'gray';
    message: string;
    details: string[];
    monthlyTotal: number;
    remainingCash: number;
}

export const calculateAffordability = (
    netIncome: number,
    fixedExpenses: number,
    assetPrice: number,
    downPayment: number,
    financeType: FinanceType,
    loanTermMonths: number = 60,
    interestRate: number = 5, // %
    maintenanceCost: number = 0, // Fuel, insurance, maintenance
    savings: number = 0,
    assetType: AssetType = 'GENERAL'
): Verdict => {
    // 1. Validate Basic Inputs
    if (!netIncome || netIncome <= 0) {
        return {
            score: 0,
            label: 'Critical',
            color: 'gray',
            message: 'Unesite prihode za izračun.',
            details: [],
            monthlyTotal: 0,
            remainingCash: 0,
        };
    }

    // 2. Calculate Monthly Cost of Asset
    let monthlyPayment = 0;
    const loanPrincipal = Math.max(0, assetPrice - downPayment);

    if (financeType === 'LOAN' && loanPrincipal > 0) {
        const r = interestRate / 100 / 12;
        // Standard amortization formula
        if (r > 0) {
            monthlyPayment = loanPrincipal * (r * Math.pow(1 + r, loanTermMonths)) / (Math.pow(1 + r, loanTermMonths) - 1);
        } else {
            monthlyPayment = loanPrincipal / loanTermMonths;
        }
    } else if (financeType === 'INSTALLMENTS' && loanPrincipal > 0) {
        // Simple division for 0% interest installments, assuming 0% rate
        monthlyPayment = loanPrincipal / loanTermMonths;
    }

    // House Specific: Add estimated maintenance (usually 1% of value/year) if not manually specified
    // Car Specific: Use provided maintenance (fuel/insurance)
    let finalMaintenanceCost = maintenanceCost;
    if (assetType === 'HOUSE' && maintenanceCost === 0) {
        finalMaintenanceCost = (assetPrice * 0.01) / 12; // 1% rule estimate
    }

    const totalMonthlyAssetCost = monthlyPayment + finalMaintenanceCost;
    const disposableIncome = netIncome - fixedExpenses;
    const remainingCashAfterPurchase = disposableIncome - totalMonthlyAssetCost;

    // 3. Evaluate Savings (for Cash purchases or Down payments)
    const initialCashOutlay = financeType === 'CASH' ? assetPrice : downPayment;
    const savingsUnhealthy = initialCashOutlay > savings; // Can't afford upfront
    const savingsWarning = initialCashOutlay > (savings * 0.8); // Draining mostly all savings

    // 4. Calculate Key Ratios
    // Rule 1: Asset cost impact on Net Income (Front-End Ratio for houses)
    const incomeShare = (totalMonthlyAssetCost / netIncome) * 100;

    // Rule 2: Asset cost impact on Disposable Income (more realistic)
    // If disposable is 0 or negative, impact is effectively infinite/critical
    const disposableShare = disposableIncome > 0
        ? (totalMonthlyAssetCost / disposableIncome) * 100
        : 999;

    // 5. Determine Verdict
    let score = 100;
    let label: Verdict['label'] = 'Safe';
    let color: Verdict['color'] = 'green';
    let message = 'Samo naprijed! Ovo je financijski sigurna odluka.';
    const details: string[] = [];

    // --- CRITICAL CHECKS ---
    if (savingsUnhealthy) {
        return {
            score: 0,
            label: 'Critical',
            color: 'red',
            message: 'Nemate dovoljno ušteđevine za početno plaćanje.',
            details: ['Nedostaje vam gotovine za kupnju ili učešće.'],
            monthlyTotal: totalMonthlyAssetCost,
            remainingCash: remainingCashAfterPurchase
        };
    }

    if (remainingCashAfterPurchase < 0) {
        return {
            score: 0,
            label: 'Critical',
            color: 'red',
            message: 'Ova kupnja bi vas dovela u minus svaki mjesec.',
            details: ['Vaši troškovi bi bili veći od prihoda.'],
            monthlyTotal: totalMonthlyAssetCost,
            remainingCash: remainingCashAfterPurchase
        };
    }

    // --- SCORING LOGIC ---

    if (assetType === 'HOUSE') {
        // 28/36 Rule Adaptation
        // Front-End Ratio (Housing Costs vs Income) - Limit ~28%
        if (incomeShare > 28) score -= 20;
        if (incomeShare > 35) score -= 20;

        // We don't have full debt info, so we rely on disposable income impact
        if (disposableShare > 40) score -= 20;
        if (disposableShare > 60) score -= 30;

        if (score >= 80) {
            message = 'Odlično! Ovo je unutar preporučenih 28% vaših prihoda.';
        } else if (score >= 50) {
            message = 'Prihvatljivo, ali blizu gornje granice preporučenih troškova stanovanja.';
        } else {
            message = 'Rizično. Trošak stanovanja prelazi sigurne standarde (30%+ prihoda).';
        }

    } else {
        // Car / General Logic
        // Penalize for Income Share
        if (incomeShare > 10) score -= 10;
        if (incomeShare > 15) score -= 20;
        if (incomeShare > 20) score -= 30;

        // Penalize for Disposable Impact
        if (disposableShare > 30) score -= 15;
        if (disposableShare > 50) score -= 25;
    }

    // Penalize for Savings Drain
    if (savingsWarning) score -= 15;

    // Determine Label based on Score
    if (score >= 80) {
        label = 'Safe';
        color = 'green';
        if (!message.includes('Odlično')) message = 'Samo naprijed! Vaš budžet ovo lako podnosi.';
        details.push(`Trošak je ${incomeShare.toFixed(1)}% vaših prihoda.`);
        details.push('Imate dovoljno "slobodnog novca" nakon kupnje.');
    } else if (score >= 50) {
        label = 'Stretch';
        color = 'yellow';
        if (!message.includes('Prihvatljivo')) message = 'Moguće, ali budite oprezni. Ovo će nategnuti vaš budžet.';
        if (details.length === 0) details.push('Trošak zauzima značajan dio vašeg slobodnog novca.');
        if (savingsWarning) details.push('Pazite, ovo će potrošiti većinu vaše ušteđevine.');
    } else {
        label = 'Risky';
        color = 'red';
        if (!message.includes('Rizično')) message = 'Visok rizik. Savjetujemo jeftiniju opciju ili veću štednju.';
        details.push(`Ovo zauzima velikih ${incomeShare.toFixed(1)}% vaših mjesečnih prihoda.`);
        details.push('Neće vam ostati dovoljno novca za nepredviđene troškove.');
    }

    return {
        score,
        label,
        color,
        message,
        details,
        monthlyTotal: totalMonthlyAssetCost,
        remainingCash: remainingCashAfterPurchase
    };
};
