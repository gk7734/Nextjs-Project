import { useRouter } from "next/router";
import useSWR from "swr";
import {getAllEvents, getFilteredEvents} from "../../../helpers/api-util";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import {Fragment, useEffect, useState} from "react";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";
import {router} from "next/client";

const fetcher = (url) => {
    return fetch(url).then(res => res.json())
}

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState()
    const filterData = router.query.slug;
    const url = "https://nextjs-study-eb27b-default-rtdb.firebaseio.com/events.json"

    const {data, error} = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events)
        }
    }, [data]);

    if (!loadedEvents) {
        return <p className="center">Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear
    const numMonth = +filteredMonth


    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2022 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const {params} = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2022 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: {hasError: true}
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });


    return{
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}

export default FilteredEventsPage;