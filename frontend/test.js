function calculateDaysBetweenDates(begin, end) {
    var date1 = new Date(begin);
    var date2 = new Date(end);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;    
}