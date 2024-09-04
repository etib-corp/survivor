import { Rating, Table } from "flowbite-react";
import { CiBank } from "react-icons/ci";
import { FaCreditCard, FaCcPaypal } from "react-icons/fa";

export const PaymentsMethod: React.FC<{ method: string }> = ({ method }) => {
    return (
        <span>
            {method === "Credit Card" && <FaCreditCard className="h-6 w-10 rounded-md" />}
            {method === "Bank Transfer" && <CiBank className="h-6 w-10 rounded-md" />}
            {method === "PayPal" && <FaCcPaypal className="h-6 w-10 rounded-md" />}
        </span>
    )
}

const PaymentsTable: React.FC<{ payments: any }> = ({ payments }) => {
    const lastPayments = payments.slice(-4).reverse();

    return (
        <Table hoverable className="border rounded-md bg-transparent">
            <Table.Head className="border bg-transparent">
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Date
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Payment Method
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Amount
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Comment
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="border">
                {lastPayments.map((payment: any) => (
                    <Table.Row className="border">
                        <Table.Cell className="text-blueT font-semibold">
                            {payment.date}
                        </Table.Cell>
                        <Table.Cell>
                            <PaymentsMethod method={payment.method} />
                        </Table.Cell>
                        <Table.Cell>
                            -${payment.amount}
                        </Table.Cell>
                        <Table.Cell>
                            {payment.comment}
                        </Table.Cell>
                    </Table.Row>))}
            </Table.Body>
        </Table>
    )
}

const MeetingsTable: React.FC<{ meetings: any }> = ({ meetings }) => {
    const lastMeetings = meetings.slice(-5).reverse();

    return (
        <Table hoverable className="border rounded-md bg-transparent">
            <Table.Head className="border bg-transparent">
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Date
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Rating
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Report
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                    Source
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="border">
                {lastMeetings.map((meeting: any) => (
                    <Table.Row className="border">
                        <Table.Cell className="text-blueT font-semibold">
                            {meeting.date}
                        </Table.Cell>
                        <Table.Cell>
                            <Rating>
                            {[...Array(5)].map((star, index) => (
                                <Rating.Star filled={index < meeting.rating} />
                            ))}
                            </Rating>
                        </Table.Cell>
                        <Table.Cell>
                            {meeting.report}
                        </Table.Cell>
                        <Table.Cell>
                            {meeting.source}
                        </Table.Cell>
                    </Table.Row>))}
            </Table.Body>
        </Table>
    )
}

const ProfileStats: React.FC<{ properties: any }> = ({ properties }) => {
    return (
        <div className="flex flex-col bg-white border w-[75%] rounded-md py-4 px-4 h-[75%]">
            <div className="flex flex-col space-y-4">
                <h1 className="font-semibold">
                    Recent Meetings
                </h1>
                <MeetingsTable meetings={properties.meetings}/>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
                <h1 className="font-semibold">
                    Payments history
                </h1>
                <PaymentsTable payments={properties.payments}/>
            </div>
        </div>
    )
}

export default ProfileStats;