export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(0);
}

export default formatCurrency;
