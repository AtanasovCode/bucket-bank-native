
const formatMoney = (money) => {
    return parseFloat(money).toLocaleString('en-US', { minimumFractionDigits: 2 });
};

const formatName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
};

const getRemaining = (goal, saved) => {
    let result = parseFloat(goal) - parseFloat(saved);
    return result >= 0 ? result : 0;
}

const getProgress = (saved, goal) => {
    let progress = (saved / goal) * 100;
    let percent = progress.toFixed(0);

    return `${percent}%`;
}

export {
    formatMoney,
    formatName,
    getRemaining,
    getProgress,
};