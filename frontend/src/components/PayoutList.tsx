import {Payout} from "../types/Payout.ts";
import {useState} from "react";
import PayoutModal from "./PayoutModal.tsx";

const PayoutList = ({payouts}: { payouts: Payout[] }) => {
    const sorted = [...payouts].sort((a, b) => b.amount - a.amount);
    const showMore = payouts.length > 3;
    const [showPayoutModal, setShowPayoutModal] = useState(false);

    return (
        <div className="border rounded p-2 mt-3">
            <h6 className="mb-2">Payouts:</h6>
            {sorted.slice(0, 3).map((p, index) => (
                <div key={index} className="d-flex justify-content-between w-50">
                    <span>{p.country}</span>
                    <span>{p.amount} EUR</span>
                </div>
            ))}
            {showMore && (
                <>
                    <button
                        type="button"
                        className="btn btn-link text-primary mt-1 p-0 small fw-normal"
                        onClick={() => setShowPayoutModal(true)}
                    >
                        Show more...
                    </button>
                </>
            )}
            <PayoutModal payouts={sorted} show={showPayoutModal} onClose={() => setShowPayoutModal(false)}/>

        </div>
    );
};

export default PayoutList;
