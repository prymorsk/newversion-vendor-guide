import styles from './styles.module.scss';
import MessageComponent from "@/components/MessageComponent";

export default function page({params}) {
    const bidId = params.id[0];
    const bidReceiverId = params.id[1];
    return (
        <MessageComponent bidId={bidId} receiverId={bidReceiverId} styles={styles} />
    );
};