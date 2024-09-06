import { List, Timeline } from "flowbite-react";
import { HiCurrencyDollar } from "react-icons/hi";

export const PaymentHistory: React.FC<{ properties: any }> = ({ properties }) => {
    return (
        <div>
            <Timeline horizontal className="mt-10">
                {properties.map((payment: any) => (
                    <Timeline.Item>
                        <Timeline.Point icon={HiCurrencyDollar}/>
                        <Timeline.Content>
                            <Timeline.Time>
                                {payment.date}
                            </Timeline.Time>
                            <List>
                                <List.Item>
                                    Amount: {payment.amount}
                                </List.Item>
                            </List>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
}