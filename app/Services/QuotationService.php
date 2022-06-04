<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Quotation;
use App\Helpers\Calculate;
use App\Http\Traits\StandardizedResponse;
use App\Http\Requests\StoreQuotationRequest;

class QuotationService
{
    use StandardizedResponse;

    /**
     * Calculate total of new quotation
     *
     * @param array $attributes
     * @return array
     */
    private function generate(array $attributes): array {
        $ages = explode(",", $attributes['age']);
        $startDate = Carbon::parse($attributes['start_date']);;
        $endDate = Carbon::parse($attributes['end_date']);

        return $attributes + [
            'user_id' => auth()->id(),
            'total' => Calculate::getQuotationTotal($ages, ($endDate->diffInDays($startDate) + 1)),
        ];
    }

    /**
     * Store a new quotation
     *
     * @param array $quotationData
     * @return \App\Models\Quotation|null
     */
    private function store(array $quotationData): ?Quotation {
        try {
            $quotation = new Quotation();
            $quotation->fill($quotationData);
            $quotation->save();

            return $quotation;
        } catch (\Exception $e) {
            dd($e->getMessage());
            return null;
        }
    }


    public function generateAndStore(StoreQuotationRequest $request) {
        $quotation = $this->store($this->generate($request->validated()));

        if (is_null($quotation)) {
            return $this->responseJson([], 500, 'An error has occurred creating the quotation', false);
        }

        return $this->responseJson([
            'total' => $quotation->getAttribute('total'),
            'currency_id' => $quotation->getAttribute('currency_id'),
            'quotation_id' => $quotation->getAttribute('id'),
        ], 201, 'Quotation created successfully');
    }
}
