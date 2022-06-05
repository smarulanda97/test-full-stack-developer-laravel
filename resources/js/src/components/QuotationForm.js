import SelectCurrency from 'react-select-currency';

import {useQuotation} from "../hooks/useQuotation";

function QuotationForm() {
    const { result, isLoading, isGenerated, handleQuotationChange, handleQuotationSubmit } = useQuotation();

    return (
        <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-6'>
                { !isGenerated ? (
                    <>
                        <h1 className='text-center'>APP Quotation</h1>
                        <p>
                            <br/><b>Are you ready for your next trip and do you need travel insurance?</b> <br/>
                            With this application, you can calculate de cost of your travel insurance. Complete the following fields and gets your budget.
                        </p>

                        <form onSubmit={handleQuotationSubmit}>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age:</label>
                                <input
                                    required
                                    type="text"
                                    id="age"
                                    name="age"
                                    className="form-control"
                                    aria-describedby="Age"
                                    placeholder="18,21,45"
                                    autoComplete="age-new"
                                    onChange={handleQuotationChange}
                                />
                                <small>Enter the person's age, if you need multiple ages write each one separated by ",". Example: 25,35,57</small>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="currency_id" className="form-label">Country:</label>
                                <SelectCurrency
                                    required
                                    id="currency_id"
                                    name="currencyId"
                                    className={'form-control'}
                                    onChange={handleQuotationChange}
                                />
                                <small>Select your country</small>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="start_date" className="form-label">Trip start date:</label>
                                <input
                                    required
                                    type="date"
                                    id="start_date"
                                    name="startDate"
                                    className="form-control"
                                    aria-describedby="Start date"
                                    placeholder="2022-06-29"
                                    autoComplete="start-date-new"
                                    onChange={handleQuotationChange}
                                />
                                <small>Initial date of your trip</small>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="end_date" className="form-label">Trip end date:</label>
                                <input
                                    required
                                    type="date"
                                    id="end_date"
                                    name="endDate"
                                    className="form-control"
                                    aria-describedby="end date"
                                    placeholder="2022-06-29"
                                    autoComplete="end-date-new"
                                    onChange={handleQuotationChange}
                                />
                                <small>Final date of your trip</small>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success mx-auto d-block"
                                disabled={isLoading}
                            >Get a quote</button>

                            {/*{error ? (*/}
                            {/*    <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">*/}
                            {/*        {error}*/}
                            {/*    </div>*/}
                            {/*): null}*/}
                        </form>
                    </>
                ): (
                    <>
                        <h1 className='text-center'>Quotation result</h1>
                        <p>
                            <b>ID: </b> &nbsp; {result.quotationId}
                        </p>
                        <p>
                            <b>Total: </b> &nbsp; {result.total}
                        </p>
                        <p>
                            <b>Trip start date: </b> &nbsp; {result.startDate}
                        </p>
                        <p>
                            <b>Trip end date: </b> &nbsp; {result.endDate}
                        </p>
                        <p>
                            <b>Age: </b> &nbsp; {result.age}
                        </p>
                    </>
                )}
            </div>
        </div>
    )

}

export default QuotationForm;
