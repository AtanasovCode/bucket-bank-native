
const formatMoney = (money) => {
    return parseFloat(money).toFixed(2);
};

const formatName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
};

export {
    formatMoney,
    formatName,
};