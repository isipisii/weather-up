const useDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    const dateNow = date.toDateString();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return { dateNow, monthName, year };
}
export default useDate;