export const deliveryOptions = [{
    id: '1',
    deliveryDays: 0,
    priceCents: 0,
    deliveryText: 'Pick up at Phan Thong'
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 5000,
    deliveryText: 'Post Office'
}, {
    id: '3',
    deliveryDays: 2,
    priceCents: 10000,
    deliveryText: 'Fast Post Office'
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOption[0];
}
