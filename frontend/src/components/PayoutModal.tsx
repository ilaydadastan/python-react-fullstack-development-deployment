import ReactDOM from 'react-dom';
import {Payout} from "../types/Payout.ts";

const PayoutModal = ({payouts, show, onClose}: { payouts: Payout[], show: boolean, onClose: () => void }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">All Payouts</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {payouts.map((p, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <span>{p.country}</span>
                                    <span>{p.amount} EUR</span>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>,
        document.body
    );
};

export default PayoutModal;
