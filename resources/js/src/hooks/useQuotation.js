import { useState } from "react";

import * as quotationApi from '../services/quotation';

export function useQuotation() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [result, setResult] = useState({
        age: '',
        total: '',
        quotationId: '',
        currencyId: '',
        startDate: '',
        endDate: '',
    });
    const [quotation, setQuotation] = useState({
        age: '',
        currencyId: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.trim()) {
            return;
        }

        setQuotation({
            ...quotation,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const { data } = await quotationApi.generateQuotationService({
                age: quotation.age,
                end_date: quotation.endDate,
                start_date: quotation.startDate,
                currency_id: quotation.currencyId,
            });
            setIsGenerated(true);
            setResult({
               ...quotation,
                quotationId: data.quotation_id || '',
                total: data.total || ''
            })
        } catch (err) {
            setIsLoading(false);
        }
    }

    return {
        result,
        isLoading,
        isGenerated,
        handleQuotationChange: handleChange,
        handleQuotationSubmit: handleSubmit
    }
}
