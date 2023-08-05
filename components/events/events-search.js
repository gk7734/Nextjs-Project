import Button from "../ui/button";
import classes from "./events-search.module.css"

function EventsSearch(props) {
    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month">
                        <option value='1'>1월</option>
                        <option value='2'>2월</option>
                        <option value='3'>3월</option>
                        <option value='4'>4월</option>
                        <option value='5'>5월</option>
                        <option value='6'>6월</option>
                        <option value='7'>7월</option>
                        <option value='8'>8월</option>
                        <option value='9'>9월</option>
                        <option value='10'>10월</option>
                        <option value='11'>11월</option>
                        <option value='12'>12월</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
}

export default EventsSearch;