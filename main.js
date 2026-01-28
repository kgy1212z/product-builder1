const KRW_TO_USD_RATE = 1300;

function formatCurrency(amountInKRW) {
    const amountInUSD = amountInKRW / KRW_TO_USD_RATE;
    return `₩${amountInKRW.toLocaleString('ko-KR')} ($${amountInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
}

class PayslipComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setData(data) {
        const {
            employeeName, employeeId, workingDays, 
            dailyWage, hourlyWage, 
            earnedIncomeTax, residentTax, healthInsurance, nationalPension, employmentInsurance,
            totalEarnings, totalDeductions, netPay
        } = data;

        this.shadowRoot.innerHTML = `
            <style>
                .payslip {
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    font-family: 'Courier New', Courier, monospace;
                }
                .payslip h2 {
                    text-align: center;
                    color: #333;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                }
                .payslip-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-top: 20px;
                }
                .payslip-section h3 {
                    color: #34495e;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                }
                .payslip-section div {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                }
                .total {
                    font-weight: bold;
                    color: #e74c3c;
                }
                .net-pay {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #2ecc71;
                }
            </style>
            <div class="payslip">
                <h2>Payslip</h2>
                <div class="payslip-section">
                    <h3>Employee Details</h3>
                    <div><span>Employee Name:</span> <span>${employeeName}</span></div>
                    <div><span>Employee ID:</span> <span>${employeeId}</span></div>
                    <div><span>Working Days:</span> <span>${workingDays}</span></div>
                </div>
                <div class="payslip-grid">
                    <div class="payslip-section">
                        <h3>Earnings</h3>
                        <div><span>Daily Wage:</span> <span>${formatCurrency(dailyWage)}</span></div>
                        <div><span>Regular Hourly Wage:</span> <span>${formatCurrency(hourlyWage)}</span></div>
                        <div class="total"><span>Total Earnings:</span> <span>${formatCurrency(totalEarnings)}</span></div>
                    </div>
                    <div class="payslip-section">
                        <h3>Deductions</h3>
                        <div><span>Earned Income Tax:</span> <span>${formatCurrency(earnedIncomeTax)}</span></div>
                        <div><span>Resident Tax:</span> <span>${formatCurrency(residentTax)}</span></div>
                        <div><span>Health Insurance:</span> <span>${formatCurrency(healthInsurance)}</span></div>
                        <div><span>National Pension:</span> <span>${formatCurrency(nationalPension)}</span></div>
                        <div><span>Employment Insurance:</span> <span>${formatCurrency(employmentInsurance)}</span></div>
                        <div class="total"><span>Total Deductions:</span> <span>${formatCurrency(totalDeductions)}</span></div>
        